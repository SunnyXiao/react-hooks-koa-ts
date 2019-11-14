import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routers from './routerConfig';
import { AppContext } from './context/appContext';

const  { lazy, useContext } = React

function Routes() {
  const {userName} = useContext(AppContext)
  return(
    <Switch>
      {
        routers.map((item,index) => {
          const DynamicComponent =lazy(() => import(`${item.component}/index`))
          return <Route key={index} path={item.path} exact render={props =>(
            <div>
              {
                !item.auth
                ? (item.name=="Login" && userName
                  ? (<Redirect to={{ pathname: "/home"}}/>)
                  :<DynamicComponent {...props} />)
                : (userName
                    ? (<DynamicComponent {...props} />)
                    : (<Redirect to={{ pathname: "/login", state: {from: props.location}
                    }}/>)
                )
              }
            </div>
          )}></Route>
        })
      }
    </Switch>
  )
}
export default Routes;
