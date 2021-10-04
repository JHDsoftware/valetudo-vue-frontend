export const bodySelections = [
  {
    id: 'B', name: 'Primary front bodice neckline', subOptions: [
      {id: 1, name: 'Straight'},
      {id: 2, name: 'Sweetheart'},
      {id: 3, name: 'V-neck'},
      {id: 4, name: 'Basket'},
      {id: 5, name: 'Scoop neck'},
      {id: 6, name: 'Crewneck'},
      {id: 7, name: 'Boatneck'},
      {id: 8, name: 'Mockneck'},
      {id: 9, name: 'Off the shoulder'},
      {id: 10, name: 'Slant shoulder'},
      {id: 11, name: 'Waterdrop'}
    ]
  },
  {
    id: 'C', name: 'Font bodices lining', subOptions: [
      {id: '2a', name: 'Standard'},
      {id: '2b', name: 'Subtle'},
      {id: '2c', name: 'Angeled'},
      {id: '2d', name: 'Pointed'},
      {id: '2e', name: 'Narrow'}
    ]
  },
  {
    id: 'D', name: 'Front bodices lining', subOptions: [
      {id: 'Da', name: 'Unlined'},
      {id: 'Db', name: 'Lined'},
      {id: 'Dc', name: 'Totally unlined wich lace'}
    ]
  },
  {
    id: 'E', name: 'Bodice lace', subOptions: [
      {id: 'Ea', name: 'Unlined'},
      {id: 'Eb', name: 'Unlined'},
      {id: 'Ec', name: 'Unlined'},
      {id: 'Ed', name: 'Unlined'},
      {id: 'Ee', name: 'Unlined'},
      {id: 'Ef', name: 'Unlined'}
    ]
  },
  {
    id: 'F', name: 'Front bodice details', subOptions: [
      {id: 'Fa', name: 'No details'},
      {id: 'Fb', name: 'Folded Neckline'},
      {id: 'Fc', name: 'Bodice ruching'}
    ]
  },
  {
    id: 'G', name: 'Body sleeves', subOptions: [
      {id: 'Ga', name: 'No'},
      {id: 'Gb', name: 'Short sleeve'},
      {id: 'Gc', name: 'Middle lang sleeves'},
      {id: 'Gd', name: 'Lang sleeves'}
    ]
  },
  {
    id: 'H', name: 'Straps details', subOptions: [
      {id: 'Ha', name: 'Straight'},
      {id: 'Hb', name: 'Flower'},
      {id: 'Hc', name: 'Flared sleeves'}
    ]
  },
  {
    id: 'I', name: 'Sleeves detail: material', subOptions: [
      {id: 'Ia', name: 'Fabric'},
      {id: 'Ib', name: 'Nude tull'},
      {id: 'Ic', name: 'Lace'}
    ]
  },
  {
    id: 'J', name: 'Straps details', subOptions: [
      {id: 'Ja', name: 'Strapless'},
      {id: 'Jb', name: 'Spaghetti straps'},
      {id: 'Jc', name: 'Straps with fabric'},
      {id: 'Jd', name: 'Straps with lace'}
    ]
  },
  {
    id: 'K', name: 'Vorrangiger Ausschnitt des Rückens', subOptions: [
      {id: 'Ka', name: 'gerade Ausschnitt des Unterteils'},
      {id: 'Kb', name: 'gerade Ausschnitt des Oberteils'},
      {id: 'Kc', name: 'U Ausschnitt'},
      {id: 'Kd', name: 'V Ausschnitt'},
      {id: 'Ke', name: 'Zwei gerade Träger'},
      {id: 'Kf', name: 'trapezförmig'},
      {id: 'Kg', name: 'Kreuz'},
      {id: 'Kh', name: 'Diamant'},
      {id: 'Ki', name: 'Off the shoulder'},
      {id: 'Kj', name: 'One Shoulder Ausschnitt'},
      {id: 'Kk', name: 'Mockneck'}
    ]
  },
  {
    id: 'L', name: 'Der Unterstoff des Rückens(Oberteil)', subOptions: [
      {id: 'La', name: 'Unterstoff mit Stoff'},
      {id: 'Lb', name: 'Unterstoff mit Spitze'},
      {id: 'Lc', name: 'Bereich ohne Unterstoff mit Spitze bedeckt'},
      {id: 'Ld', name: 'Bereich ohne Unterstoff mit Spitze bedeckt'}
    ]
  },
  {
    id: 'M', name: 'Der Verschluss', subOptions: [
      {id: 'Ma', name: 'Nur mit Reißverschlus'},
      {id: 'Mb', name: 'mit Reißverschluss und Dekoknöpfe'},
      {id: 'Mc', name: 'Nur mit Knöpf'}
    ]
  }
]
export const skirtSelections = require('@/assets/skirt.json')
export const selections = [bodySelections, skirtSelections]
export const selectionTree = require('@/assets/optionsTree.json')
console.log(selectionTree)

export function availableTrees (selectedPart,
                                baseNode = null,
                                incomingNode = null) {
  console.log(selectedPart, baseNode, incomingNode)
  const options = selectionTree[0]
  const selectedTop = selectedPart[0]['B']
  console.log(options, selectedTop)
  const trees = []
  const targetTop = options.children.find(c => c.name === selectedTop.toString())
  const res = getFullPathsOfTree(targetTop)
  console.log(res)

  return trees
}

function getFullPathsOfTree (tree, paths = [], currentPath = []) {
  console.log('---->')
  console.log('Current Node:' + tree.name + '|CurrentPath:' + currentPath.join('/') +
    '|should go deeper:' + (tree.children.length > 0))
  console.log(currentPath)

  if (tree.children.length > 0) {
    currentPath.push(tree.name)
    tree.children.forEach(c => {
      getFullPathsOfTree(c, paths, currentPath)
    })
    currentPath.pop()
  } else {
    paths.push([...currentPath, tree.name])
  }
  console.log('<------')
  return paths

}

export const weddingItem = {
  bodice: {},
  sleeves: {},
  skirt: {}
}
