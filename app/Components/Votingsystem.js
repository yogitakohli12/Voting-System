import { useEffect, useState } from "react";
import {
  owner,
  isvoted,
  getWinner,
  getCandidates,
  candidates,
  vote,
  addCandidate,
} from "../../Voting";
import Web3 from "web3";
export default function VotingSystem() {
    const web3 = new Web3(window.ethereum);
  const [ownerAccount, setOwnerAccount] = useState("");
  const [winner, setWinner] = useState("");
  const [allCandidates, setAllCandidates] = useState([]);
  const [specificCandidate, setSpecificCandidate] = useState({});
  const [voterAddress, setVoterAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateadd, setCandidateadd] = useState("");
  const [candidateIndex, setCandidateIndex] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        web3.utils.isAddress(accounts[0])
        setVoterAddress(accounts[0]); // Set the first wallet address
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect MetaMask.");
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  useEffect(() => {
    (async () => {
      setOwnerAccount(await owner());
      setWinner(await getWinner());
      setAllCandidates(await getCandidates());
    })();
  }, []);

  const handleVote = async () => {
    try {
        if (!voterAddress) return alert("Connect MetaMask first!");
        if (!candidateName) return alert("Select a candidate!");
        if (!web3.utils.isAddress(voterAddress)) {
            return alert("Invalid Ethereum address!");
          }
      if(await isvoted(voterAddress)===true){
        return alert("You have already voted");
      }else{
        await vote(candidateName, voterAddress);
       
        setWinner(await getWinner());
        setAllCandidates(await getCandidates());
        alert("Vote casted successfully!");
        console.log("Vote casted successfully:");
      }
     
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleAddCandidate = async () => {
    try {
      if (!candidateadd) return alert("Enter a candidate name");
      const existingCandidates = await getCandidates();
        const isCandidateExists = existingCandidates.some(c => c.name.toLowerCase() === candidateadd.toLowerCase());
        if (isCandidateExists) {
            return alert("Candidate already exists!");
        }
      await addCandidate(candidateadd, ownerAccount);
      setAllCandidates(await getCandidates());
      setAllCandidates(await getCandidates());
      setCandidateName("");
      alert("Candidate added successfully!");
      console.log("Candidate added successfully:");
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

const hnandleChange = (e) => {
    setCandidateIndex(e.target.value);
}


  const handleGetCandidate = async () => {
    

    try {
      if (candidateIndex === "") return alert("Enter candidate index");
      const result = await candidates(parseInt(candidateIndex));
      setSpecificCandidate(result);
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
  };

  return (
    <div className="voting-system">
      <p className="title">Voting System - Owner</p>
      <h2 className="winner">Current Winner - {winner || "No Winner Yet"}</h2>
   
   <div className="candidate-container">
    <h2>Candidates</h2>
      <ul className="candidate-list">
        {allCandidates.map((c, index) => (
          <li key={index} className="candidate">
            <p> {c.name} - {c.voteCount} votes</p>
          </li>
        ))}
      </ul>
    </div>
     <div className="vote-outercontainer">
     <div className="vote-container">
      <h2>Vote for Candidate</h2>
      <input
        type="text"
        placeholder="Voter Address"
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
      />
      <button onClick={connectWallet} className="btn">
          {web3.utils.isAddress(voterAddress) ? "Connected" : "Connect MetaMask"}
        </button>
      <select value={candidateName} style={{ color: "grey" }} onChange={(e) => setCandidateName(e.target.value)}>
          <option value="" >Select Candidate</option>
          {allCandidates.map((c, index) => (
            <option key={index} value={c.name} >{c.name}</option>
          ))}

        </select>
      <button onClick={handleVote} className="btn">Vote</button>
      </div>
      <div className="candidate-container">
      <h2>Add Candidate</h2>
      <input
        type="text"
        placeholder="Candidate Name"
        value={candidateadd}
        onChange={(e) => setCandidateadd(e.target.value)}
      />
      <button onClick={handleAddCandidate} className="btn">Add Candidate</button>
      </div>
      <div className="spacificcandidate-container">
      <h2>Find Specific Candidate</h2>
      <input
        type="number"
        placeholder="Candidate position"
        value={candidateIndex}
        onChange={hnandleChange}
      />
      <button onClick={handleGetCandidate} className="btn">Get Candidate</button>
      <p><strong>Name:</strong> {specificCandidate.name || "N/A"}</p>
      <p><strong>Votes:</strong> {specificCandidate.voteCount || "N/A"}</p>
      </div>
     </div>
     
    </div>
  );
}
