import { Component } from 'react';

type PropsType = {
  id: number,
  title: string,
  body: string,
} 

export default class Card extends Component<PropsType> {

  constructor(props: PropsType){
    super(props)
  }

  render() {
    return (
      <div>
        <article
          style={{
            border: '1px solid #3d43eb',
            padding: '0px 15px',
            borderRadius: '10px',
          }}
          key={this.props.id}
        >
          <h3>{this.props.title}</h3>
          <p>{this.props.body}</p>
        </article>
      </div>
    );
  }
}
