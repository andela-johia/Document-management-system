import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Parser from 'html-react-parser';
import { withRouter } from 'react-router-dom';
import { fetchDocument } from '../../actions/documentActions';
import DocumentForm  from './DocumentForm.jsx';
import NavigationBar from '../users/NavigationBar.jsx';
import  UpdateDocumentForm  from './UpdateDocumentForm.jsx';
import DeleteDocument  from './DeleteDocument.jsx';
import DocumentView from './DocumentView.jsx';

/**
 *
 * fetches all user document and displays and renders it
 * @class ViewUserDocuments
 * @extends {React.Component}
 */
export class ViewUserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.userId,
      document: [],
      offset: 0,
      limit: 6,
      pageCount: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @return {void} - null
   * checks if the user is authenticated before mounting the component
   * @memberof ViewUserDocuments
   */
  componentDidMount() {
    $('.button-collapse').sideNav('hide');
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/');
    }
    const { id, limit, offset } = this.state;
    this.props.fetchDocument({ id, limit, offset });
  }
  /**
   * @returns {void} - null
   * recieves new props from the redux store as the
   *  component renders or rerenders
   * @param {array} nextProps - array of document recieved from redux store
   * @memberof ViewUserDocuments
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.userDocument, pageCount: nextProps.pageCount });
  }
  /**
   * updates the offset on page change
   * @returns{void} returns a dispatch fetch document action
   * @param {number} data -current page selected
   * @memberof ViewUserDocuments
   */
  handlePageChange(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      const { id, limit } = this.state;
      this.props.fetchDocument({ id, offset, limit });
    });
  }

  render() {
    if (this.props.isAuthenticated === false) return null;
    const userDocuments = this.state.document;
    return (
      <div>
        <DocumentForm />
        <NavigationBar />
        <h5 className="my-document">My Documents</h5>
        <div className="rows">
          {userDocuments.length > 0 ?
          <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          initialPage={0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        /> : '' }
        </div>
        <div className="container">
          <div className="row">
            {userDocuments.map(document => (
              <div className="col s12 m4" key={document.id}>
                <div className="card small  grey lighten-4">
                  <div className="card-content black-text">
                    <span className="card-title" value={document.id}>
                      {document.title}
                    </span>
                    {Parser(document.content)}
                  </div>
                  <div className="card-action">
                    <p>{document.access}</p>
                    <DeleteDocument cardDocument={document.id} />
                    <div id="editIcon">
                    <UpdateDocumentForm cardDocuments={document}
                     />
                     </div>
                     <DocumentView documentView={document} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
ViewUserDocuments.propTypes = {
  userId: PropTypes.number.isRequired,
  userDocument: PropTypes.array.isRequired,
  pageCount: PropTypes.number,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  fetchDocument: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  userId: state.usersReducer.user.id,
  isAuthenticated: state.usersReducer.isAuthenticated,
  userDocument: state.documentReducer.document,
  pageCount: state.documentReducer.pagination.pageCount
});
export default
  connect(mapStateToProps, { fetchDocument })(withRouter(ViewUserDocuments));
