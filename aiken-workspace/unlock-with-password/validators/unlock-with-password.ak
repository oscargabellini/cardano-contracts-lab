use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}
use mocktail.{complete, mocktail_tx, required_signer_hash}
use mocktail/virgin_key_hash.{mock_pub_key_hash}
use mocktail/virgin_output_reference.{mock_utxo_ref}

pub type Datum {
  owner: VerificationKeyHash,
  password_hash: ByteArray,
}

fn hash_password(password: ByteArray) -> ByteArray {
  crypto.blake2b_256(password)
}

pub type Redeemer {
  password: ByteArray,
}

validator unlock_with_password {
  spend(
    datum_opt: Option<Datum>,
    redeemer: Redeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(datum) = datum_opt
    let password_is_correct =
      hash_password(redeemer.password) == datum.password_hash
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)
    password_is_correct && must_be_signed
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
  let datum =
    Some(
      Datum {
        owner: mock_pub_key_hash(0),
        password_hash: hash_password("Hello, World!"),
      },
    )
  let redeemer = Redeemer { password: "Hello, World!" }
  let tx = mock_tx(True)
  unlock_with_password.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}

test test_failed_unlock_incorrect_redeemer() {
  let datum =
    Some(
      Datum {
        owner: mock_pub_key_hash(0),
        password_hash: hash_password("Hello, World!"),
      },
    )
  let redeemer = Redeemer { password: "GM World!" }
  let tx = mock_tx(True)
  !unlock_with_password.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}

test test_failed_unlock_without_signer() {
  let datum =
    Some(
      Datum {
        owner: mock_pub_key_hash(0),
        password_hash: hash_password("Hello, World!"),
      },
    )
  let redeemer = Redeemer { password: "Hello, World!" }
  let tx = mock_tx(False)
  !unlock_with_password.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}
