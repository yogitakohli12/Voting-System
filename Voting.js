import exp from 'constants';
import Web3 from 'web3'
const web3 = new Web3('HTTP://127.0.0.1:7545');

const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_candidateName",
				"type": "string"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "candidateName",
				"type": "string"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Voting.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress='0x70955788c491539C9AA306F2f968505d092b76BD'
const contract =new web3.eth.Contract(ABI,contractAddress);
 
export const isvoted=async(voteraddress)=>{
    const getvoted = await contract.methods.voters(voteraddress).call();
    console.log("voter",getvoted);
	return getvoted;
}
 export const owner=async()=>{
	const getowner = await contract.methods.owner().call();
    console.log("owner",getowner);
	return getowner;
}
export const getWinner=async()=>{
	const winner = await contract.methods.getWinner().call();
	console.log("winner", winner)
	return winner
}
export const getCandidates= async ()=>{
	const allcandidates = await contract.methods.getCandidates().call();
	console.log("All Candidates", allcandidates)
	return allcandidates
}
export const candidates=async(candidateposition)=>{
    const getspecificcandidate = await contract.methods.candidates(candidateposition).call();
    console.log("specific candidate", getspecificcandidate)
return getspecificcandidate;
}
export const vote=async(name,voteraddress)=>{
	const givevote = await contract.methods.vote(name).send({from:voteraddress});
	console.log(givevote)
	return givevote;
}
export const addCandidate=async(candidatename,owner)=>{
	const add =await contract.methods.addCandidate(candidatename).send({from:owner})
	console.log("add candidate",add)
	return add;
}