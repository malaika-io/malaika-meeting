import Button from './Button'

const InfoBox = () => (
  <>
    <div className="content infobox">
      <h1>Votre ange de maison</h1>
      <p>Malaika facilite le suivi de malade de personnes agées, en les connectant a 
      des professionnels de santé </p>
      <Button link="/contact" cta="Organiser une demo"/>
    </div>
    <style jsx>{`
      h1 {
        font-size: 36px;
      }
      .infobox {
        padding: 2em;
      }
    `}</style>
  </>
)

export default InfoBox