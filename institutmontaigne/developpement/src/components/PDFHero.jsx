import { PATH_PUBLIC } from "../data/debate";

export default function PDFHero({ meta }) {
    const intervenantsData = [meta.intervenants[0], meta.intervenants[1]];

    return (
        <div className="bg-white h-screen max-w-3xl flex-col items-center justify-center mx-auto hidden print:flex">
            <h1 className="text-4xl font-bold text-center text-[#00483B]">
                {meta.titre}
            </h1>
            <h2 className="text-2xl font-bold text-center text-[#00483B] mt-10">
                {meta.sousTitre}
            </h2>
            <div className="flex items-center gap-10 mt-10">
                <div className="flex flex-col items-center justify-center w-[220px]">
                    <div className="relative w-[220px]">
                        <img src={`${PATH_PUBLIC}/pp/${intervenantsData[0].id}-3.png`} alt="" className="relative z-[2] w-full"/>
                        <img className="absolute -top-10 right-15" src={`${PATH_PUBLIC}/icons/EtoileBleue.svg`} alt="" />
                    </div>
                    <svg width="10" height="31" viewBox="0 0 10 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.488691 29.3663L-0.00025408 29.4708L0.208868 30.4487L0.697813 30.3442L0.593252 29.8552L0.488691 29.3663ZM8.60977 15.2552L9.10156 15.1649V15.1649L8.60977 15.2552ZM2.31165 0.007404C2.03551 0.00786214 1.81202 0.232089 1.81248 0.508231L1.81992 5.00822C1.82038 5.28437 2.04461 5.50785 2.32075 5.5074C2.59689 5.50694 2.82038 5.28271 2.81992 5.00657L2.81331 1.00658L6.8133 0.99996C7.08944 0.999503 7.31293 0.775276 7.31247 0.499133C7.31201 0.22299 7.08779 -0.000496596 6.81164 -3.98052e-05L2.31165 0.007404ZM0.593252 29.8552L0.697813 30.3442C1.78794 30.111 2.92334 29.4226 3.9812 28.4695C5.0455 27.5105 6.06363 26.2547 6.91629 24.8334C8.61479 22.0022 9.70175 18.4353 9.10156 15.1649L8.60977 15.2552L8.11798 15.3454C8.65945 18.2958 7.68202 21.6132 6.05877 24.319C5.25055 25.6662 4.29347 26.842 3.31182 27.7265C2.32373 28.6168 1.34242 29.1837 0.488691 29.3663L0.593252 29.8552ZM8.60977 15.2552L9.10156 15.1649C8.62049 12.5437 7.81145 9.59546 6.72917 6.90774C5.65058 4.22919 4.2834 1.76588 2.66545 0.153266L2.31248 0.507404L1.95951 0.861542C3.43757 2.33472 4.74335 4.65335 5.80155 7.28127C6.85606 9.90002 7.64767 12.7828 8.11798 15.3454L8.60977 15.2552Z" fill="#AC7DD1"/>
                    </svg>
                    <div className="relative flex items-center justify-center">
                        <svg width="166" height="51" viewBox="0 0 166 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.9596 2.48035L-0.000327902 43.0459L84.5 50.2539L165.401 43.046L156.291 7.70125L61.9589 -0.000121257L4.9596 2.48035Z" fill="#AC7DD1"/>
                        </svg>
                        <p className="w-full absolute text-center text-white font-bold print:!text-white print-force-white">
                            {meta.intervenants[0].nom}
                        </p>
                    </div>
                    <p className="w-full text-[#AC7DD1] pt-5">
                        {meta.intervenants[0].titre}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-[220px]">
                    <div className="relative w-[220px]">
                        <img src={`${PATH_PUBLIC}/pp/${intervenantsData[1].id}-1.png`} alt="" className="relative z-[2] w-full" />
                        <img className="absolute -top-10 -right-10" src={`${PATH_PUBLIC}/icons/EtoileJaune.svg`} alt="" />
                    </div>
                    <svg width="34" height="97" viewBox="0 0 34 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.8062 95.0387L33.2678 94.8465L33.6521 95.7697L33.1905 95.9619L32.9984 95.5003L32.8062 95.0387ZM0.499807 52.5001L0.999805 52.5001L0.499807 52.5001ZM17.7161 0.0883933C17.9435 -0.0683761 18.2548 -0.0111815 18.4116 0.216141L20.9664 3.92063C21.1231 4.14795 21.0659 4.45933 20.8386 4.6161C20.6113 4.77287 20.2999 4.71568 20.1431 4.48836L17.8723 1.19548L14.5794 3.46637C14.352 3.62314 14.0407 3.56595 13.8839 3.33862C13.7271 3.11129 13.7843 2.79992 14.0117 2.64315L17.7161 0.0883933ZM32.9984 95.5003L33.1905 95.9619C32.5087 96.2457 31.4783 96.3691 30.2428 96.3242C28.9931 96.2788 27.4859 96.0592 25.8219 95.6178C22.4932 94.7347 18.5125 92.9571 14.6839 89.8727C7.00975 83.6903 -0.000296618 72.3024 -0.000191836 52.5001L0.499807 52.5001L0.999805 52.5001C0.999705 72.0419 7.90368 83.1263 15.3112 89.094C19.0234 92.0846 22.8756 93.8016 26.0783 94.6512C27.6799 95.0761 29.1131 95.2825 30.2792 95.3249C31.4595 95.3678 32.3205 95.2409 32.8062 95.0387L32.9984 95.5003ZM0.499807 52.5001L-0.000191836 52.5001C-0.00010912 36.1584 4.14873 24.4477 8.42872 16.1345C10.5666 11.982 12.7359 8.68006 14.4228 6.08905C15.2687 4.78972 15.9862 3.67997 16.5241 2.72596C17.0662 1.76447 17.3984 1.00736 17.5082 0.409672L18 0.500003L18.4918 0.590335C18.3504 1.35986 17.9475 2.23752 17.3952 3.21709C16.8387 4.20413 16.1026 5.3417 15.2608 6.63466C13.5723 9.22823 11.4294 12.4908 9.31781 16.5922C5.09888 24.7868 0.99989 36.3416 0.999805 52.5001L0.499807 52.5001Z" fill="#872339"/>
                    </svg>
                    <div className="relative flex items-center justify-center">
                        <svg width="147" height="43" viewBox="0 0 147 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-5.14036e-05 12.4138L81.1792 6.82227e-05L144.623 1.96968L146.838 32.6324L77.2988 42.7498L6.73925 42.7498L-5.14036e-05 12.4138Z" fill="#872339"/>
                        </svg>
                        <p className="w-full absolute text-center text-white font-bold print:!text-white print-force-white">
                            {meta.intervenants[1].nom}
                        </p>
                    </div>
                    <p className="w-full text-[#872339] pt-5">
                        {meta.intervenants[1].titre}
                    </p>
                </div>
            </div>
        </div>
    );
}