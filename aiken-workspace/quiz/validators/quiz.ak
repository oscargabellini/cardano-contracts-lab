use aiken/crypto
use cardano/address.{Address}
use cardano/transaction.{OutputReference, Transaction}
use mocktail.{complete, mocktail_tx}
use mocktail/virgin_key_hash.{mock_pub_key_hash}
use mocktail/virgin_output_reference.{mock_utxo_ref}

pub type Datum {
  answer_hash: ByteArray,
  fee_address: Address,
  question: ByteArray,
}

pub type Redeemer {
  answer: ByteArray,
}

fn hash_answer(answer: ByteArray) -> ByteArray {
  crypto.blake2b_256(answer)
}

validator quiz {
  spend(
    datum_opt: Option<Datum>,
    redeemer: Redeemer,
    _input: OutputReference,
    _tx: Transaction,
  ) {
    expect Some(datum) = datum_opt
    let answer_is_correct = hash_answer(redeemer.answer) == datum.answer_hash

    answer_is_correct
  }

  else(_) {
    fail
  }
}

fn mock_address(index: Int) -> address.Address {
  let mock_key_hash = mock_pub_key_hash(index)
  address.from_verification_key(mock_key_hash)
}

fn mock_tx() -> Transaction {
  mocktail_tx()
    |> complete()
}

test right_answer() {
  let datum =
    Some(
      Datum {
        answer_hash: hash_answer("20"),
        fee_address: mock_address(0),
        question: "How many Scudetto has Inter won?",
      },
    )

  let redeemer = Redeemer { answer: "20" }
  let input = mock_utxo_ref(0, 0)
  let tx = mock_tx()
  quiz.spend(datum, redeemer, input, tx)
}

test wrong_answer() {
  let datum =
    Some(
      Datum {
        answer_hash: hash_answer("20"),
        fee_address: mock_address(0),
        question: "How many Scudetto has Inter won?",
      },
    )

  let redeemer = Redeemer { answer: "19" }
  let input = mock_utxo_ref(0, 0)
  let tx = mock_tx()
  !quiz.spend(datum, redeemer, input, tx)
}

test empty_answer() {
  let datum =
    Some(
      Datum {
        answer_hash: hash_answer("20"),
        fee_address: mock_address(0),
        question: "How many Scudetto has Inter won?",
      },
    )
  let redeemer = Redeemer { answer: "" }
  let tx = mock_tx()
  !quiz.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}
