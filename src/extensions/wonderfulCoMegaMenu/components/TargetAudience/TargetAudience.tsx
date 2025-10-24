import * as React from "react";
import { ITargetAudienceProps } from "./ITargetAudienceProps";

export default class TargetAudience extends React.Component<ITargetAudienceProps>{

  public render(): JSX.Element {
    const canView: boolean = this.props.userAudiences.some(r => this.props.groupIds.indexOf(r) >= 0);
    return (<>{this.props.groupIds ? (canView ?
      this.props.children : ``) : this.props.children}</>);
  }
}
