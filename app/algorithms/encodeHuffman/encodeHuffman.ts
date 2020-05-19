import calculateFrequencyTable from './calculateFrequencyTable.ts/calculateFrequencyTable';
import {
  getHuffmanCodes,
  createFrequencyTree
} from '../FrequencyBinaryTree/FrequencyBinaryTree';

export default function encodeHuffman(text: string) {
  const frequencyTable = calculateFrequencyTable(text);
  const frequencyTree = createFrequencyTree(frequencyTable);
  const huffmanCodesTable = getHuffmanCodes(frequencyTree);
  return huffmanCodesTable;
}
