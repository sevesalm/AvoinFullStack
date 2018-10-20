import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let savedItems = {};

const localStorageMock = {
  clear: () => {
    savedItems = {};
  },
  getItem: key => savedItems[key] || 'null',
  setItem: (key, item) => {
    savedItems[key] = item;
  }
};

(window as any).localStorage = localStorageMock;
