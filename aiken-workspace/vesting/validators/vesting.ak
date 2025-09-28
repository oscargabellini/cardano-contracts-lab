use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}
use mocktail.{complete, invalid_before, mocktail_tx, required_signer_hash}
use mocktail/virgin_key_hash.{mock_pub_key_hash}
use mocktail/virgin_output_reference.{mock_utxo_ref}
use vodka_extra_signatories.{key_signed}
use vodka_validity_range.{valid_after}

pub type Datum {
  beneficiary: VerificationKeyHash,
  unlock_time: Int,
}

validator vesting {
  spend(
    datum: Option<Datum>,
    _redeemer: Void,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(datum) = datum

    and {
      key_signed(tx.extra_signatories, datum.beneficiary),
      valid_after(tx.validity_range, datum.unlock_time),
    }
  }

  else(_) {
    fail
  }
}

type TestCase {
  is_beneficiary_signed: Bool,
  is_lock_time_passed: Bool,
}

fn mock_tx(test_case: TestCase) -> Transaction {
  mocktail_tx()
    |> required_signer_hash(test_case.is_beneficiary_signed, mock_pub_key_hash(0))
    |> invalid_before(test_case.is_lock_time_passed, 1000 + 1)
    |> complete()
}

test success_beneficiary_unlocking() {
  let datum =
    Some(Datum { beneficiary: mock_pub_key_hash(0), unlock_time: 1000 })
  let tx =
    mock_tx(TestCase { is_beneficiary_signed: True, is_lock_time_passed: True })

  vesting.spend(datum, Void, mock_utxo_ref(0, 0), tx)
}

test fail_beneficiary_before_lock() {
  let datum =
    Some(Datum { beneficiary: mock_pub_key_hash(0), unlock_time: 1000 })
  let tx =
    mock_tx(
      TestCase { is_beneficiary_signed: True, is_lock_time_passed: False },
    )

  !vesting.spend(datum, Void, mock_utxo_ref(0, 0), tx)
}

test fail_wrong_beneficiary() {
  let datum =
    Some(Datum { beneficiary: mock_pub_key_hash(1), unlock_time: 1000 })
  let tx =
    mock_tx(TestCase { is_beneficiary_signed: True, is_lock_time_passed: True })
  !vesting.spend(datum, Void, mock_utxo_ref(0, 0), tx)
}
