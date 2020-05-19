import Stack from './Stack/Stack';

interface FrequencyTreeNode {
  value: { chars: string; frequency: number };
  right?: FrequencyTreeNode;
  left?: FrequencyTreeNode;
}

export const createFrequencyTree = (
  frequencyTable: { char: string; frequency: number }[]
) => {
  if (!frequencyTable.length) {
    const root: FrequencyTreeNode = { value: { chars: '', frequency: 0 } };
    return root;
  }
  const nodes: FrequencyTreeNode[] = [];

  frequencyTable.forEach(frequncy => {
    nodes.push({
      value: {
        chars: frequncy.char,
        frequency: frequncy.frequency
      }
    });
  });

  while (nodes.length > 2) {
    const tmp: (FrequencyTreeNode | undefined)[] = [];

    tmp.push(nodes.pop());
    tmp.push(nodes.pop());

    nodes.push({
      value: {
        chars:
          tmp[0] && tmp[1] ? tmp[0].value.chars.concat(tmp[1].value.chars) : '',
        frequency:
          tmp[0] && tmp[1] ? tmp[0].value.frequency + tmp[1].value.frequency : 0
      },
      right: tmp[1],
      left: tmp[0]
    });
    nodes.sort((a, b) => (a.value.frequency < b.value.frequency ? 1 : -1));
  }

  if (nodes.length === 2) {
    const root: FrequencyTreeNode = {
      value: {
        chars: nodes[0].value.chars + nodes[1].value.chars,
        frequency: nodes[0].value.frequency + nodes[1].value.frequency
      },
      right: nodes[1],
      left: nodes[0]
    };

    return root;
  }
  const root: FrequencyTreeNode = {
    value: {
      chars: nodes[0].value.chars,
      frequency: nodes[0].value.frequency
    },
    left: nodes[0]
  };

  return root;
};

export const getHuffmanCodes = (root: FrequencyTreeNode) => {
  const table: { char: string; code: string }[] = [];
  const stack = new Stack<FrequencyTreeNode>();
  stack.push({ data: root, code: '' });
  while (!stack.empty()) {
    const current = stack.pop();
    if (!current.data.right && !current.data.left) {
      if (current.data.value.chars) {
        table.push({ char: current.data.value.chars, code: current.code });
      }
    }
    if (current.data.right && !current.data.left) {
      stack.push({ data: current.data.right, code: current.code.concat('0') });
    }
    if (!current.data.right && current.data.left) {
      stack.push({ data: current.data.left, code: current.code.concat('0') });
    }
    if (current.data.right && current.data.left) {
      stack.push({ data: current.data.right, code: current.code.concat('1') });
      stack.push({ data: current.data.left, code: current.code.concat('0') });
    }
  }

  return table;
};
