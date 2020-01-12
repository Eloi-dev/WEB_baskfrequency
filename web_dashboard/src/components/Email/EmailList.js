import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: '100%'
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  // const [left, setLeft] = React.useState([0, 1, 2, 3]);
  // const [right, setRight] = React.useState([4, 5, 6, 7]);

  // const leftChecked = intersection(checked, left);
  // const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  // const handleCheckedRight = () => {
  //   setRight(right.concat(leftChecked));
  //   setLeft(not(left, leftChecked));
  //   setChecked(not(checked, leftChecked));
  // };

  // const handleCheckedLeft = () => {
  //   setLeft(left.concat(rightChecked));
  //   setRight(not(right, rightChecked));
  //   setChecked(not(checked, rightChecked));
  // };

  const customList = (items) => (
    <Card elevation={0} className={classes.listContainer}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={"Liste des adhérents"}
        subheader={`${numberOfChecked(items)}/${items.length} sélectionné•s`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.firstname + ' ' + value.lastname} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div>
        {customList(props.adherents.all)}
    </div>
  );
}