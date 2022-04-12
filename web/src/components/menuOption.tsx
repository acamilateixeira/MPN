import { IconButton } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface MenuOptionProps {
  to: string;
  title: string;
  icon: IconType;
}

export function MenuOption(props: MenuOptionProps) {
  const css = makeStyles({
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 16,
      transform: 'translateY(1px)',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        color: '#233DFF',
        transform: 'translateY(-5px)',
      },
    },
    listItemText: {
      marginLeft: 10,
      fontSize: 14,
    },
  })();

  const Icon = props.icon;

  return (
    <ListItem button classes={{ root: css.listItem }} component={Link} to={props.to}>
      <IconButton>
        <Icon size={14} />
      </IconButton>

      <ListItemText primary={props.title} classes={{ primary: css.listItemText }} />
    </ListItem>
  );
}
