import React, { ChangeEvent } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as action from '../redux/fileRedux/fileAction';
import { RootState } from '../redux/rootReducer';

interface StateProps {
  encrypted_lang: number;
}

interface DispatchProps {
  switchLanguage: (lang: string) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const LangBar = (props: Props) => {
  const tabChangeHandler = (event: ChangeEvent<{}>, val: string) => {
    props.switchLanguage(val);
  };

  return (
    <StyledTabs value={props.encrypted_lang} onChange={tabChangeHandler}>
      <Tab label='Encrypted' value={1} />
      <Tab label='English' value={0} />
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)`
  margin-top: 5px;
`;

const mapStateToProps = (state: RootState) => {
  return {
    encrypted_lang: state.fileReducer.encrypted_lang,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    switchLanguage: (lang: string) => dispatch(action.switchLanguage(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LangBar);
