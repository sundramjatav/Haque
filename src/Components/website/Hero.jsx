import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
    useMotionTemplate,
    useMotionValue,
    motion,
    animate,
} from "framer-motion";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Routers } from "../../Routes/Routers";
import GradientHeading from "./GradientHeading";

const COLORS_TOP = ["#13FFAA", "#3FB649", "#1E67C6", "#CE84CF", "#DD335C"];

const Hero = () => {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    return (
        <motion.section
            style={{
                backgroundImage,
            }}
            className="relative min-h-screen flex flex-col gap-10 overflow-hidden bg-gray-950 px-4 text-gray-200"
        >
            <div className="w-full relative z-10">
                <Navbar />
            </div>

            <div className="relative z-10 flex flex-col items-center md:pb-10 mt-20">
                <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
                    Beta Now Live!
                </span>
                <GradientHeading className={'text-center'} text="Welcome to Trade Mint Pro" />
                <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
                    Your trusted partner in crypto earning and investing. <br />
                    Unlock secure opportunities with staking, mining, and DeFi projects. <br />
                    Benefit from expert guidance, advanced tools, and personalized support. <br />
                    Experience growth with secure, innovative blockchain solutions.
                </p>
                <Link to={Routers.LOGIN}>
                    <motion.button
                        style={{
                            border,
                            boxShadow,
                        }}
                        whileHover={{
                            scale: 1.015,
                        }}
                        whileTap={{
                            scale: 0.985,
                        }}
                        className="group relative md:mt-0 mt-20 flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                    >
                        Connect Wallet
                        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                    </motion.button>
                </Link>
            </div>



            <div className="absolute inset-0 z-0">
                <Canvas>
                    <Stars radius={50} count={2500} factor={4} fade speed={2} />
                </Canvas>
            </div>
        </motion.section>
    );
};

export default Hero;
