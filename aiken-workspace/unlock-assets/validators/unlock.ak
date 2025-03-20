use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}
use mocktail.{complete, mocktail_tx, required_signer_hash}
use mocktail/virgin_key_hash.{mock_pub_key_hash}
use mocktail/virgin_output_reference.{mock_utxo_ref}

pub type Datum {
  owner: VerificationKeyHash,
}

validator unlock {
  spend(
    datum_opt: Option<Datum>,
    _redeemer: Void,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(datum) = datum_opt
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)
    must_be_signed
  }

  else(_) {
    fail
  }
}

fn mock_tx(is_owner_signed: Bool) -> Transaction {
  mocktail_tx()
    |> required_signer_hash(is_owner_signed, mock_pub_key_hash(0))
    |> complete()
}

test test_unlock() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let tx = mock_tx(True)
  unlock.spend(datum, Void, mock_utxo_ref(0, 0), tx)
}

test test_failed_unlock_without_signer() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let tx = mock_tx(False)
  !unlock.spend(datum, Void, mock_utxo_ref(0, 0), tx)
}
