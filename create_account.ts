import {
  clusterApiUrl,
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  getMinimumBalanceForRentExemption,
} from "@solana/web3.js";
import bs58 from "bs58";

(async () => {
  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const PRIVATE_KEY = 
    "33wCj3UfzQeHacfVFdZBbXADPXKVXZGiDJqGTxa3hanRJCYVA1YoJDvqCvU7KbZt87Hvd5hDxnFtz57Wm5jZdDVg"
  const decoded = bs58.decode(PRIVATE_KEY);

  const MY_KEYPAIR = Keypair.fromSecretKey(decoded);


  const tx = new Transaction();
  const NEW_ACCOUNT_KEYPAIR = Keypair.generate();
  const lamports = await Connection.getMinimumBalanceForRentExemption(0);

  tx.instructions = [
    SystemProgram.createAccount({
      fromPubkey: MY_KEYPAIR.publicKey,
      newAccountPubkey: NEW_ACCOUNT_KEYPAIR.publicKey,
      lamports,
      space: 0,
      programId: SystemProgram
      .programId,
    })
  ];

  const txHash = await CONNECTION.sendTransaction(tx, [
    
    MY_KEYPAIR,
    NEW_ACCOUNT_KEYPAIR,
  ]);

  console.log(txHash);
  

})();

