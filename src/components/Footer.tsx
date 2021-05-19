import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux/rootReducer';

interface StateProps {
  encrypted_lang: number;
}

interface DispatchProps {}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const Footer = (props: Props) => {
  return (
    <FooterContainer>
      <Container>
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8}>
            {props.encrypted_lang
              ? `q'$=6'.+$=(2=-$5$1=3'$=24,=.%=3'$=/ 132=J=(3=(2=&1$ 3$1=.1=+$22$1I=#$/$-#(-&=.-='.6=6$++=3'$=(-#(5(#4 +2=6.1*=3.&$3'$1`
              : ' The whole is never the sum of the parts - it is greater or lesser, depending on how well the individuals work together'}
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Container>
    </FooterContainer>
  );
};

const FooterContainer = styled.aside`
  margin: auto;
  text-align: center;
  position: absolute;
  bottom: 0;
  color: #98a0a6;
  width: 100%;
  background-color: black;
`;

const mapStateToProps = (state: RootState) => {
  return {
    encrypted_lang: state.fileReducer.encrypted_lang,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
