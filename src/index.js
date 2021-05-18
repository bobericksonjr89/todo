import Item from './Items'


const App = (() => {
    const item1 = Item("clean", "clean the whole house", "tomorrow", "level 1");
    window.item1 = item1;
})();