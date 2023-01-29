import React from "react";
import Logo from '../../logo.svg'

function Home() {
    return (
        <main className="w-full flex flex-col p-5 mt-5 items-center">
            <img src={Logo} alt="React" className="w-2/6" />
            <h2 className="font-bold text-3xl">Wirawan Mahardika</h2>
            <h5 className="font-semibold text-lg">Backend Developer</h5>
        </main>
    )
}

export default Home