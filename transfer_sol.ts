import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {

  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const MY_KP = Keypair.fromSecretKey(bs58.decode("33wCj3UfzQeHacfVFdZBbXADPXKVXZGiDJqGTxa3hanRJCYVA1YoJDvqCvU7KbZt87Hvd5hDxnFtz57Wm5jZdDVg"));
  const TO_ADDRESS = new PublicKey("PiWL9ghYyqfGwa58QDTKSEWq4PWcf3BZJdkLKnaSx1x");

  const tx = new Transaction();

  tx.instructions = [
    SystemProgram.transfer({
      fromPubkey: MY_KP.publicKey,
      toPubkey: TO_ADDRESS,
      lamports: await CONNECTION.getMinimumBalanceForRentExemption(0),
    })
  ];

  const txHash = await CONNECTION.sendTransaction(tx, [
    MY_KP,
  ]);

  console.log(txHash);

})();
