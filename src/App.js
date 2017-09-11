import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Media
} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">

    <Media.List>
      <Media.ListItem>
        <Media.Left>
          <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>Media heading</Media.Heading>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>

            <Media>
              <Media.Left>
                <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Nested media heading</Media.Heading>
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>

                <Media>
                  <Media.Left>
                    <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
                  </Media.Left>
                  <Media.Body>
                    <Media.Heading>Nested media heading</Media.Heading>
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                  </Media.Body>
                </Media>
              </Media.Body>
            </Media>

            <Media>
              <Media.Left>
                <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Nested media heading</Media.Heading>
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
              </Media.Body>
            </Media>
        </Media.Body>
      </Media.ListItem>
    </Media.List>



  </div>
    );
  }
}

export default App;
