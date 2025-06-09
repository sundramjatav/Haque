import React, { useState } from 'react';

const tabData = [
  {
    id: 'blockchain',
    title: 'What is Blockchain?',
    content: `Blockchain is a decentralized digital ledger that securely records transactions across a network of computers.
Each transaction is grouped into a block, and these blocks are linked in chronological order to form a chain.
Key features include decentralization, transparency, immutability, and security, making blockchain the foundation
of cryptocurrencies like Bitcoin and useful in various industries for secure and transparent data management.`,
  },
  {
    id: 'cryptocurrency',
    title: 'What is Cryptocurrency?',
    content: `Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit.
It operates on decentralized networks using blockchain technology, eliminating intermediaries like banks.
Bitcoin is the most well-known example, and it's used as a payment method or as a speculative investment.`,
  },
  {
    id: 'mining',
    title: 'What is Cryptocurrency Mining?',
    content: `Crypto mining is a process where miners, using powerful computers, solve complex mathematical problems to validate
and add transactions to a blockchain, the ledger that records all cryptocurrency transactions.
This process also creates new digital tokens or coins as a reward for the miners' work. Essentially,
it's like a distributed, decentralized way to ensure the integrity and security of a cryptocurrency network.`,
  },
];

const InfoTabs = () => {
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  const currentTab = tabData.find(tab => tab.id === activeTab);

  return (
    <section className="bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {tabData.map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-bg-color text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 px-4 rounded-lg">
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">
            {currentTab.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoTabs;
