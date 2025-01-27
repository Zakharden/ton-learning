import { mnemonicToWalletKey } from "@ton/crypto";
import { comment, fromNano, internal, TonClient, WalletContractV4 } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const mnemonic="ugly drip journey such virtual capital fatigue anger letter half airport inflict diary amazing noodle report dignity angry range inmate raw total debris need"
    const key =  await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0});
    
    const endpoint = await getHttpEndpoint({ network: "testnet"});
    const client = new TonClient({ endpoint});
    
    if(!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed!");
    }

    const WalletContract = client.open(wallet);
    const seqno = await WalletContract.getSeqno();

    await WalletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: "EQAf6wFCrh2T7OxcbP9tnzIIrcUFNbcpDU4yhZaSnDjCp44V",
                value: "0.066",
                body: "zakharden sender -test",
                bounce: false
            })
        ]   
    });

    let currentSeqno = seqno;
    while(currentSeqno == seqno) {
        console.log("waiting for transaction to confirm...");
        sleep(1500);
        currentSeqno = await WalletContract.getSeqno();
    }
}
//Отправляет транзакцию - с келймом ошибка 503 апишки, надо перепроверить позже
main();