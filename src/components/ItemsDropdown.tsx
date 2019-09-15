import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

type Props = {
  items: { [index: string]: string };
  itemOrder: string[];
  selectedKey: string;
  className?: string;
  onSelect: (eventKey: string, event: Object) => any;
}

const renderNativeSelect = (props: Props) => {
  return (
    <select className={props.className} onChange={(event) => { props.onSelect(event.target.value, {}) }}>
    {
      props.itemOrder.map((k: string) =>
        <option value={k} selected={k === props.selectedKey}>{props.items[k]}</option>
      )
    }
    </select>
  );
}

const renderBootstrapDropdown = (props: Props) => {
  return (
    <Dropdown role="menu" className={props.className} onSelect={props.onSelect}>
    <Dropdown.Toggle size="sm" variant="info" id="dropdown-basic" onSelect={props.onSelect}>
    { props.items[props.selectedKey] }
    </Dropdown.Toggle>
    <Dropdown.Menu>
    {
      props.itemOrder.map((k: string) =>
        <Dropdown.Item key={k} eventKey={k}>{props.items[k]}</Dropdown.Item>
      )
    }
    </Dropdown.Menu>
  </Dropdown>
  );
}

const ItemsDropdown: React.FunctionComponent<Props> = (props: Props) => {
  if (!(props.selectedKey in props.items)) {
    console.error('Selected key does not exist in items object.', props.selectedKey, props.items);
    throw ReferenceError('Selected key does not exist in items object.');
  }

  if (isMobile.any()) {
    return renderNativeSelect(props);
  } else {
    return renderBootstrapDropdown(props);
  }
}

export default ItemsDropdown;
