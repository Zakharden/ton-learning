import { mnemonicToWalletKey } from "@ton/crypto";
import { fromNano, TonClient, WalletContractV4 } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

async function main() {
    const mnemonic="ugly drip journey such virtual capital fatigue anger letter half airport inflict diary amazing noodle report dignity angry range inmate raw total debris need"
    const key =  await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0});
    
    const endpoint = await getHttpEndpoint({ network: "testnet"});
    const client = new TonClient({ endpoint});
    
    const balance = await client.getBalance(wallet.address);
    console.log("balance:" , fromNano(balance));

    const WalletContract = client.open(wallet);
    const seqno = await WalletContract.getSeqno();
    console.log("seqno:" , seqno);

}
//выводит баланс + количество совершенных операций
main();