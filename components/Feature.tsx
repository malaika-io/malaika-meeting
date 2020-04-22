import Button from "./Button";

const Feature = ({ title, description, img }) => (
  <>
    <div className="feature">
      <div className="content">
        <img src={img} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Button link="/product" cta="Détails"/>
    </div>
    <style jsx>{`
      .feature {
        margin: 2em;
        padding-left: 2em;
        padding-right: 2em;
      }
      img {
        height: 65%;
        width: 65%;
      }
    `}</style>
  </>
)

export default Feature