import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { TGCase, ReduxState } from './Types';
import { tgCases, videoRefs } from './data/Data';
import ReactPlayer from 'react-player'

type StateProps = {
  caseId?: string;
}

type OwnProps = {
}

type DispatchProps = {
}

type Props = StateProps & OwnProps & DispatchProps;

function renderVideoPlayer(iVideoEvidence:string[]){

    let iRefVideoCode:string = iVideoEvidence[0];
    let elapsedSeconds:number = getElapsedSecondsFromTimeString(iVideoEvidence[1]);
    let iCompiledURL:string = videoRefs[iRefVideoCode]['url'].concat('?t=', elapsedSeconds.toString());

    let player = React.createRef<ReactPlayer>();

    function handleVideoStart(){
      if (player.current){
        player.current.seekTo(elapsedSeconds)
      }
    }

    return (<ReactPlayer 
            ref={player}
            url={iCompiledURL}
            playing={false} 
            controls={true}
            onStart={handleVideoStart}
            width={'75%'}
            height={'75%'}
            />)    

}

// Function for converting hh:mm:ss string to elapsed seconds
function getElapsedSecondsFromTimeString(timeString: string):number{
    // Presume the timeString is in the format of hh:mm:ss
    let components = timeString.split(':');
    let elapsedSeconds:number = parseInt(components[0])*3600 +parseInt(components[1])*60 + parseInt(components[2]);
    return elapsedSeconds;
}

const TGCasePanel: React.FunctionComponent<Props> = (props) => {
  if (props.caseId) {
    const tgCase: TGCase = tgCases[props.caseId];
    console.log(tgCases, props.caseId, tgCase);
    return (
      <Card>
        <Card.Header>{ tgCase.case_id }</Card.Header>
        <Card.Body>
          <div>Site: { tgCase.case_site }</div>
          <div>Cartridge: { tgCase.cartridge }</div>
          <div>Quantity: { tgCase.quantity }</div>
          <div>Videos: { tgCase.live_video_refs }</div>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    caseId: state.caseId,
  };
};

const ConnectedTGCasePanel = connect(mapStateToProps)(TGCasePanel);
export default ConnectedTGCasePanel;
