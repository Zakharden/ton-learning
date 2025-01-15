import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

async function main() {
    const mnemonic="ugly drip journey such virtual capital fatigue anger letter half airport inflict diary amazing noodle report dignity angry range inmate raw total debris need"
    const key =  await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0});
    
    console.log(wallet.address.toString({ testOnly: true}));
    console.log("workchain:" , wallet.address.workChain);
}

main();