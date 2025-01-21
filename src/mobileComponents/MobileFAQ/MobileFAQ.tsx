import React from "react";
import "./MobileFAQ.css";
import MobileQA from "../MobileQA/MobileQA.tsx";
import { Link } from "react-router-dom";

interface FAQProps {
    currentLanguage: string;
}

function MobileFAQ({ currentLanguage }: FAQProps) {
    // Each FAQ item has both an English (en) and Spanish (es) version
    const faqs = [
        {
            en: {
                question:
                    "How do I find my judge and city if I know my A number?",
                answer: (
                    <>
                        Step 1) Go to{" "}
                        <a
                            href='https://example.gov/lookupA'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            this website
                        </a>
                        . Step 2) Enter your A Number in the input field and
                        click enter. Step 3) You will see your case information,
                        including your judge and city. You can now search for
                        their grant rates on this website's search bar.
                    </>
                ),
            },
            es: {
                question:
                    "¿Cómo encuentro a mi juez y ciudad si conozco mi número A?",
                answer: (
                    <>
                        Paso 1) Ve a{" "}
                        <a
                            href='https://example.gov/lookupA'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            este sitio web
                        </a>
                        . Paso 2) Ingresa tu número A en el campo y presiona
                        enter. Paso 3) Verás tu información de caso, incluyendo
                        tu juez y ciudad. Ahora puedes buscar sus tasas de
                        concesión en la barra de búsqueda de este sitio web.
                    </>
                ),
            },
            ht: {
                question:
                    "Kijan mwen ka jwenn jij mwen ak vil mwen si mwen konnen nimewo A mwen?",
                answer: (
                    <>
                        Etap 1) Ale sou{" "}
                        <a
                            href='https://example.gov/lookupA'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            sit entènèt sa a
                        </a>
                        . Etap 2) Antre nimewo A ou nan chan an epi peze antre.
                        Etap 3) Ou pral wè enfòmasyon sou ka ou, ki gen ladan
                        jij ou ak vil ou. Kounye a ou ka rechèch pou pousantaj
                        koncesyon yo sou ba rechèch sit entènèt sa a.
                    </>
                ),
            },
        },
        {
            en: {
                question: "How do I find my A Number?",
                answer: (
                    <>
                        You can find your Alien Number (A Number) at the top of
                        most forms you get from a government official at court
                        or the border. For images and more details, visit{" "}
                        <a
                            href='https://example.gov/guide'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            this guide
                        </a>
                        .
                    </>
                ),
            },
            es: {
                question: "¿Cómo encuentro mi número A?",
                answer: (
                    <>
                        Puedes encontrar tu número de extranjero (número A) en
                        la parte superior de la mayoría de los formularios que
                        recibes de un funcionario gubernamental en la corte o en
                        la frontera. Para ver imágenes y más detalles, visita{" "}
                        <a
                            href='https://example.gov/guide'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            esta guía
                        </a>
                        .
                    </>
                ),
            },
            ht: {
                question: "Kijan mwen ka jwenn nimewo A mwen?",
                answer: (
                    <>
                        Ou ka jwenn Nimewo Etranje (Nimewo A) ou nan tèt pifò
                        fòm ou resevwa nan men yon ofisyèl gouvènman an nan
                        tribinal la oswa sou fontyè a. Pou w jwenn imaj ak plis
                        detay, vizite{" "}
                        <a
                            href='https://example.gov/guide'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            gid sa a
                        </a>
                        .
                    </>
                ),
            },
        },
        {
            en: {
                question: "How do I find my grant rate?",
                answer: (
                    <>
                        Search for your asylum grant rate by entering your
                        judge's name or your city into the search box on this
                        website.
                    </>
                ),
            },
            es: {
                question: "¿Cómo encuentro mi tasa de concesión?",
                answer: (
                    <>
                        Busca tu tasa de concesión de asilo ingresando el nombre
                        de tu juez o tu ciudad en la barra de búsqueda de este
                        sitio web.
                    </>
                ),
            },
            ht: {
                question: "Kijan mwen ka jwenn pousantaj koncesyon mwen?",
                answer: (
                    <>
                        Rechèch pousantaj koncesyon azil ou lè ou antre non jij
                        ou oswa vil ou nan bwat rechèch la sou sit entènèt sa a.
                    </>
                ),
            },
        },
        {
            en: {
                question: "What do the percentages in the graphs mean?",
                answer: (
                    <>
                        The graphs and percentages show the percentage of cases
                        where relief (asylum or other) is granted. The higher
                        the number, the more cases are approved by that judge.
                    </>
                ),
            },
            es: {
                question: "¿Qué significan los porcentajes en los gráficos?",
                answer: (
                    <>
                        Los gráficos y porcentajes muestran el porcentaje de
                        casos en los que se otorga un alivio (asilo u otro).
                        Cuanto más alto sea el número, más casos son aprobados
                        por ese juez.
                    </>
                ),
            },
            ht: {
                question: "Ki sa pousantaj yo nan graf yo vle di?",
                answer: (
                    <>
                        Graf yo ak pousantaj yo montre pousantaj ka kote se bay
                        soulajman (azil oswa lòt) ki apwouve. Plis chif la wo,
                        se plis ka jij sa a apwouve.
                    </>
                ),
            },
        },
        {
            en: {
                question: "Can I switch judges if mine is bad?",
                answer: (
                    <>
                        You generally can't change judges, but you may be able
                        to move to a new city and transfer your case, in which
                        case you would get a new judge. This is known as a
                        "Change of Venue" and it may be complex.
                    </>
                ),
            },
            es: {
                question: "¿Puedo cambiar de juez si el mío es malo?",
                answer: (
                    <>
                        Generalmente no puedes cambiar de juez, pero podrías
                        mudarte a una nueva ciudad y transferir tu caso, en cuyo
                        caso obtendrías un nuevo juez. Esto se conoce como un
                        "Cambio de Sede" y puede ser complejo.
                    </>
                ),
            },
            ht: {
                question: "Èske mwen ka chanje jij si pa'm nan pa bon?",
                answer: (
                    <>
                        An jeneral ou pa kapab chanje jij, men ou ka deplase nan
                        yon nouvo vil epi transfere ka w la, kote w ta jwenn yon
                        nouvo jij. Sa rele "Chanjman Tribinal" e li ka konplike.
                    </>
                ),
            },
        },
        {
            en: {
                question:
                    "Does the percentage tell me how likely I am to get asylum?",
                answer: (
                    <>
                        The percentage does not tell you your chances of success
                        in your case. Your chances of success depend on your
                        particular case. The most important factor is finding a
                        trusted lawyer. For more information see :{" "}
                        <a
                            href='https://www.youtube.com/watch?v=Xh5hyRsX6K4'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            this video
                        </a>
                    </>
                ),
            },
            es: {
                question:
                    "¿El porcentaje me dice qué tan probable es que obtenga asilo?",
                answer: (
                    <>
                        El porcentaje no indica tus probabilidades de éxito en
                        tu caso. Tus probabilidades dependen de tu caso
                        particular. El factor más importante es encontrar un
                        abogado de confianza. Para más información, consulta:{" "}
                        <a
                            href='https://www.youtube.com/watch?v=NVugGm-bFy8'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            este video
                        </a>
                    </>
                ),
            },
            ht: {
                question:
                    "Èske pousantaj la di m konbyen chans mwen genyen pou m jwenn azil?",
                answer: (
                    <>
                        Pousantaj la pa di w konbyen chans ou genyen pou w
                        reyisi nan ka w la. Chans ou depende de ka w. Pi gwo
                        faktè a se jwenn yon avoka ou fè konfyans. Pou plis
                        enfòmasyon, gade:{" "}
                        <a
                            href='https://www.youtube.com/watch?v=Xh5hyRsX6K4'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            videyo sa a
                        </a>
                    </>
                ),
            },
        },
        {
            en: {
                question: "What does 'other relief' mean?",
                answer: (
                    <>
                        'Other relief' refers to cases where relief other than
                        asylum—such as withholding of removal, Convention
                        Against Torture (CAT), or discretionary humanitarian
                        relief—was granted.
                    </>
                ),
            },
            es: {
                question: "¿Qué significa 'otro tipo de alivio'?",
                answer: (
                    <>
                        "Otro tipo de alivio" se refiere a casos en los que se
                        otorga un alivio diferente al asilo, como retención de
                        expulsión, la Convención contra la Tortura (CAT), o
                        alivio humanitario discrecional.
                    </>
                ),
            },
            ht: {
                question: "Kisa 'lòt soulajman' vle di?",
                answer: (
                    <>
                        "Lòt soulajman" se pou ka kote ou jwenn soulajman ki pa
                        azil — tankou retansyon pou pa depòte, Konvansyon Kont
                        Tòtiti (CAT), oswa soulajman imanitè diskresyonè.
                    </>
                ),
            },
        },
    ];

    return (
        <div className='FAQ-page'>
            <div className='faq-header'>
                <h3>
                    {currentLanguage === "en"
                        ? "Frequently Asked Questions (FAQs)"
                        : currentLanguage === "es"
                        ? "Preguntas Frecuentes (FAQs)"
                        : "Kesyon Yo Poze Souvan (FAQs)"}
                </h3>
            </div>
            <div className='back-div'>
                <Link to='/'>
                    <span className='back-to-search'>
                        {currentLanguage === "en"
                            ? "Back to search"
                            : currentLanguage === "es"
                            ? "Regresar a la búsqueda"
                            : "Tounen nan rechèch"}
                    </span>
                </Link>
            </div>

            <div className='FAQs'>
                {faqs.map((item, idx) => {
                    const faqContent =
                        currentLanguage === "en"
                            ? item.en
                            : currentLanguage === "es"
                            ? item.es
                            : item.ht;

                    return (
                        <MobileQA
                            key={idx}
                            currentLanguage={currentLanguage}
                            question={faqContent.question}
                            answer={faqContent.answer}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default MobileFAQ;
