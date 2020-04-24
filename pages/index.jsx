import React from "react";
import InfoBox from '../components/InfoBox'
import Features from '../components/Features'
import Summary from '../components/Summary'
import FadeIn from "react-fade-in";

const IndexPage = () => {

    return (
        <div className="container">

            <section id="top-container" className="columns container">
                <div className="column infobox">
                    <FadeIn>
                        <InfoBox/>
                    </FadeIn>
                </div>
                <div className="column column-img">
                    <img id="main-img" src="/Component 5.svg"></img>
                </div>
            </section>
            <section className="columns">
                <Features/>
            </section>
            <section id="summary-section">
                <Summary/>
            </section>
            <style jsx>{`
                #top-container {
                  background: #F5F8FB;
                  height: 80vh;
                }
                #main-img {
                  margin: auto;
                  align-item: center;
                }
                .infobox {
                  margin: auto;
                }
                .column-img {
                  margin: auto;
                  text-align: center;
                }
                #summary-section {
                  padding: 3em;
                }
              `}</style>

        </div>

    );
};
export default IndexPage;
