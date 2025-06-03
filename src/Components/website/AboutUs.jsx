import React from 'react'
import yumekoLogo from '../../assets/yumeko-logo-white.png'
import Mission from './Mission'
import Vision from './Vision'
import InfoTabs from './InfoTabs'
import GradientHeading from './GradientHeading'

const AboutUs = () => {
    const links = [
        { name: 'Our Mission', href: '#' },
        { name: 'Our Vision', href: '#' },
        { name: 'Our Values', href: '#' },
        { name: 'Meet the Team', href: '#' },
    ]
    const stats = [
        { name: 'Offices worldwide', value: '12' },
        { name: 'Team Members', value: '300+' },
        { name: 'Years of Experience', value: '10+' },
        { name: 'Client Satisfaction', value: '100%' },
    ]

    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-7 sm:py-14">
            {/* <div
                aria-hidden="true"
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#55e043] to-[#04e604] opacity-20"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#c8ff46] to-[#09b926] opacity-20"
                />
            </div> */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-10 mx-auto max-w-4xl lg:max-w-7xl">
                    {/* Left: Text */}
                    <div className="flex-1 max-w-2xl lg:mx-0">
                        <GradientHeading text="About Us" />
                        <p className="md:mt-8 mt-3 text-pretty text-base font-medium text-gray-300 ">
                            Yumeko Ai is a pioneering cryptocurrency company focused on providing
                            innovative blockchain solutions for earning and investing. Our mission is to
                            empower individuals and businesses to achieve exceptional financial
                            growth through secure and profitable opportunities. With a team of
                            experienced professionals, we offer a range of services including  staking,
                            trading crypto, forex market,
                            mining, and decentralized finance (DeFi) projects.
                            At Yumeko Ai, we prioritize security and transparency, ensuring that your
                            investments are protected and optimized for maximum returns. Join us at
                            Yumeko Ai and take your first step towards a prosperous financial future.
                        </p>
                    </div>
                    {/* Right: Image */}
                    <div className="flex-1 flex justify-center lg:justify-end w-full max-w-sm">
                        <img src={yumekoLogo} alt="Yumeko Logo" className="rounded-xl shadow-lg w-full h-auto object-contain bg-white/5 p-4" />
                    </div>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    {/* <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <a key={link.name} href={link.href}>
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                    </div> */}
                    <dl className="mt-16 grid grid-cols-2 md:text-start text-center md:gap-8 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse gap-1">
                                <dt className="text-base/6 text-gray-300">{stat.name}</dt>
                                <dd className="text-4xl font-semibold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text  leading-tight text-transparent">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>


        </div>
    )
}

export default AboutUs
