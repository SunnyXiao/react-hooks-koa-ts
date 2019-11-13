import * as React from "react";
import {GridOptions} from '../../components/Grid/entities/gridOptions';

export interface AgGridProps extends GridOptions {
  gridOptions?: GridOptions;
}

export class AgGrid extends React.Component<AgGridProps, any> {
  // static propTypes: any;
  protected eGridDiv!: HTMLElement;

  constructor(props: AgGridProps) {
    super(props);
  }

  createStyleForDiv = () => {
    const style: any = {height: "100%"};
    // allow user to override styles
    const containerStyle = this.props.containerStyle;
    if (containerStyle) {
        Object.keys(containerStyle).forEach(key => {
            style[key] = containerStyle[key];
        });
    }
    return style;
  }

  render() {
    return React.createElement<any>("div", {
      style: this.createStyleForDiv(),
      ref: (e: HTMLElement) => {
        this.eGridDiv = e;
      }
    },[])
  }
}
