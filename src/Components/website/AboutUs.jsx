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
        <div className="relative isolate overflow-hidden bg-gray-900 py-8 sm:py-16">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-10 mx-auto max-w-4xl lg:max-w-7xl">
                    <div className="flex-1 max-w-2xl lg:mx-0">
                        <GradientHeading text="About Us" />
                        <p className="md:mt-8 mt-3 text-pretty text-base font-medium text-gray-300 ">
                            Trade Mind Pro is a pioneering cryptocurrency company focused on providing
                            innovative blockchain solutions for earning and investing. Our mission is to
                            empower individuals and businesses to achieve exceptional financial
                            growth through secure and profitable opportunities. With a team of
                            experienced professionals, we offer a range of services including  staking,
                            trading crypto, forex market,
                            mining, and decentralized finance (DeFi) projects.
                            At Trade Mind Pro, we prioritize security and transparency, ensuring that your
                            investments are protected and optimized for maximum returns. Join us at
                            Trade Mind Pro and take your first step towards a prosperous financial future.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center lg:justify-end w-full max-w-sm">
                        <img src={yumekoLogo} alt="Yumeko Logo" className="rounded-xl shadow-lg w-full h-auto object-contain bg-white/5 p-4" />
                    </div>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
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
