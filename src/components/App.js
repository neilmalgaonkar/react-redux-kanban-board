import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Main from './Main'

import * as actions from './../actions/index'

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToActions = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}


const App = connect(mapStateToProps, mapDispatchToActions)(Main)

export default App