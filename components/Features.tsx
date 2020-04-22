import Feature from './Feature'
import features from '../lib/features'


const Features: Function = (): JSX.Element[] => {
  return features.map(feature => (
    <div className="column">
      <Feature title={feature.title} description={feature.description} img={feature.img}/>
    </div>
  ))
}

export default Features