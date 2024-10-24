import { clusterApiUrl, Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58"

(async () => {
  const KONEKSYON = new Connection(clusterApiUrl("devnet"));

  const MY_KP = Keypair.fromSecretKey(bs58.decode("33wCj3UfzQeHacfVFdZBbXADPXKVXZGiDJqGTxa3hanRJCYVA1YoJDvqCvU7KbZt87Hvd5hDxnFtz57Wm5jZdDVg"));
  const TO_KP = Keypair.generate();

  const tx = new Transaction();
  const lamports = await KONEKSYON.getMinimumBalanceForRentExemption(0);

  tx.instructions = [
    SystemProgram.createAccount({
      fromPubkey: MY_KP.publicKey,
      newAccountPubkey: TO_KP.publicKey,
      lamports,
      space: 0,
      programId: SystemProgram.programId
    }),
    SystemProgram.transfer({
      fromPubkey: MY_KP.publicKey,
      toPubkey: TO_KP.publicKey,
      lamports,
    })
  ]

  const txHash = await KONEKSYON.sendTransaction(tx, [
    MY_KP,
    TO_KP,
  ])

  console.log(txHash);
})();
