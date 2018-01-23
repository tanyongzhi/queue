import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
} from 'reactstrap'
import withRedux from 'next-redux-wrapper'

import makeStore from '../redux/makeStore'
import Layout from '../components/Layout'
import StaffSidebar from '../components/StaffSidebar'
import NewQuestionContainer from '../containers/NewQuestionContainer'
import QuestionListContainer from '../containers/QuestionListContainer'

import { fetchQueue } from '../actions/queue'

class Page extends React.Component {
  static getInitialProps({ query }) {
    return {
      queueId: query.id,
    }
  }

  componentDidMount() {
    this.props.fetchQueue(this.props.queueId)
  }

  render() {
    return (
      <Layout>
        <Container fluid>
          <Row>
            <Col xs={{ size: 12 }} md={{ size: 3 }} className="mb-3 mb-md-0">
              <StaffSidebar />
            </Col>
            <Col xs={{ size: 12 }} md={{ size: 9 }} className="mb-3">
              <NewQuestionContainer queueId={this.props.queueId} />
              <QuestionListContainer queueId={this.props.queueId} />
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

Page.propTypes = {
  fetchQueue: PropTypes.func.isRequired,
  queueId: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchQueue: queueId => dispatch(fetchQueue(queueId)),
})

export default withRedux(makeStore, null, mapDispatchToProps)(Page)
