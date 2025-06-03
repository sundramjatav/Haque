import React, { useState } from 'react';

const InfoTabs = () => {
  const [activeTab, setActiveTab] = useState('blockchain');

  const tabs = {
    blockchain: {
      title: ' Blockchain',
      content: `Blockchain is a decentralized digital ledger that securely records transactions across a network of computers.
Each transaction is grouped into a block, and these blocks are linked in chronological order to form a chain.
Key features include decentralization, transparency, immutability, and security, making blockchain the foundation
of cryptocurrencies like Bitcoin and useful in various industries for secure and transparent data management.`,
    },
    cryptocurrency: {
      title: ' cryptocurrency',
      content: `Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit.
It operates on decentralized networks using blockchain technology, eliminating intermediaries like banks.
Bitcoin is the most well-known example, and it's used as a payment method or as a speculative investment.`,
    },
    mining: {
      title: ' cryptocurrency mining',
      content: `Crypto mining is a process where miners, using powerful computers, solve complex mathematical problems to validate
and add transactions to a blockchain, the ledger that records all cryptocurrency transactions.
This process also creates new digital tokens or coins as a reward for the miners' work. Essentially,
it's like a distributed, decentralized way to ensure the integrity and security of a cryptocurrency network.`,
    },
  };

  return (
    <section className="bg-gray-900 text-white pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 ">
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === 'blockchain'
                ? 'bg-bg-color text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('blockchain')}
          >
            What is Blockchain?
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === 'cryptocurrency'
                ? 'bg-bg-color text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('cryptocurrency')}
          >
            What is the cryptocurrency?
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === 'mining'
                ? 'bg-bg-color text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('mining')}
          >
            What is cryptocurrency mining?
          </button>
        </div>

        <div className="bg-gray-800 p-6 ">
          {/* <h2 className="text-2xl font-bold text-bg-color mb-4">{tabs[activeTab].title}</h2> */}
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">
            {tabs[activeTab].content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoTabs;
