import { Connection, clusterApiUrl, Keypair, } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {

  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const decoded = bs58.decode("33wCj3UfzQeHacfVFdZBbXADPXKVXZGiDJqGTxa3hanRJCYVA1YoJDvqCvU7KbZt87Hvd5hDxnFtz57Wm5jZdDVg")

  console.log(decoded);

  const encoded = bs58.encode(decoded);
  console.log(encoded);



})();
