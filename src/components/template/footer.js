/**
 * Created by arpit on 7/5/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FooterTemplate extends Component {
  renderLinks() {
    return [
      <li key={1}>
        <Link to="contact-us">Contact US</Link>
      </li>,
    ];
  }

  render() {
    const d = new Date();
    const year = d.getFullYear();

    return (
      <footer>
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <nav className="pull-right">
                <ul className="footer-nav">
                  {this.renderLinks()}
                </ul>
              </nav>
              <p className="copyright pull-left">© {year}, Company, Inc. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);
