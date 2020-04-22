import Layout from "../components/Layout";

const contact = () => {
  return (
    <Layout>
      <div className="container">
        <div className="content">
          <div className="form">
            <div className="field">
              <label className="label">Nom</label>
              <div className="control">
                <input className="input" type="text" placeholder="Votre nom"/>
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Votre email"/>
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea" placeholder="Votre message"></textarea>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox"/>
                  J'accepte les <a href="#">termes & conditions</a>
                </label>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Envoyer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        .form {
          padding-right: 10vw;
          padding-left: 10vw;
          padding-top: 5vh;
          padding-bottom: 5vh;
        }
        `}
      </style>
    </Layout>

  )
}



export default contact