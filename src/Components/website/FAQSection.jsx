import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
    {
        question: "The expense windows adapted sir. Wrong widen drawn.",
        answer: "This means the expenses were miscalculated during the initial setup of your crypto wallet or transfer window.",
    },
    {
        question: "Six curiosity day assurance bed necessary?",
        answer: "Yes, you should secure your assets with a 2FA-enabled wallet for at least 6 days after any large transfer.",
    },
    {
        question: "Produce say the ten moments parties?",
        answer: "This refers to transaction confirmations. Each block confirms a moment; 10 confirmations = high security.",
    },
    {
        question: "Simple innate summer fat appear basket his desire joy?",
        answer: "A metaphor for holding assets in a diversified crypto portfolio long-term.",
    },
    {
        question: "Outward clothes promise at gravity do excited?",
        answer: "An abstract way of saying public market sentiment can influence coin performance rapidly.",
    },
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className=" text-white py-16 px-4 relative">
            <div className="max-w-5xl mx-auto text-center">
                <p className="text-sm text-bg-color font-medium mb-2">Frequently Asked Questions</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions & Answers</h2>
                <p className="text-gray-400 mb-12 max-w-xl mx-auto">
                    Everything you need to know about Yumeko Ai, its stability, usage, and availability. If you have more questions, feel free to reach out.
                </p>

                <div className="space-y-4 text-sm md:text-base" >
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-4 border cursor-pointer transition-all duration-300"
                            onClick={() => toggle(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h4 className="text-left font-medium">{item.question}</h4>
                                <FaChevronDown
                                    className={`transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </div>
                            {activeIndex === index && (
                                <p className="text-gray-400 text-sm mt-3 text-left">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="">
                <div className="w-60 h-60 rounded-full bg-bg-color absolute top-0 left-0 blur-3xl opacity-100"></div>
            </div>
        </div>
    );
};

export default FAQSection;
