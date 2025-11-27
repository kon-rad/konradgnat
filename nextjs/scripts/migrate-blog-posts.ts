import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Blog posts data extracted from the SQL file
const blogPosts = [
  {
    title: 'What is Redux-Saga',
    content: `<div class="jumbotron_image__redux-saga">
      <img class="img-responsive" src="../static/images/redux-saga.png" alt="redux-saga" />
    </div>
<p>Redux saga is a redux middleware library that is designed to simplify, make more efficient and easier to test the handling of side effects and network requests in your redux app.</p>

            <p>Redux-Saga is a middleware which means that it can be started, paused and cancelled from the main application with normal redux actions. It can dispatch redux actions and has access to the full redux application state.</p>

            <p>It uses a new ES6 feature called 'Generators' that allows us to write asynchronous code that looks synchronous and is easy to test. </p>

            <p>This seems to be the currently preferred library to what was commonly used before: redux-thunk. As it states in the docs; with redux-saga 'you don't end up in callback hell, you can test your asynchronous flows easily and your actions stay pure.'</p>

            <p>With react-thunk it was required to return a function and deal with a promise chain. Instead with redux-saga we write a simple try/catch block to catch any errors involved with request and use 'put' to dispatch an action to notify our reducers.</p>

            <p>Install:</p>
            <code>$ yarn add redux-saga</code>

            <section class="blog_links">
              <h3>Links</h3>
              <div class="well well-lg">
              <p>
              <a href="https://github.com/redux-saga/redux-saga">Github</a>
              </p>
              <p>
              <a href="https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html">Official Documentation and Tutorial</a>
              </p><p>
              <a href="https://redux-saga.js.org/docs/ExternalResources.html">Info on Generators</a>
                </p>
              </div>
            </section>`,
    preview: 'Redux saga is a redux middleware library that is designed to simplify...',
    created_on: new Date('2017-12-03T01:41:57Z'),
  },
  {
    title: 'How to test a react app with Jest',
    content: `<div class="jumbotron_image__logo">
      <img class="img-responsive" src="../static/images/jest.png" alt="jest" />
    </div>
<p>Jest is a testing framework maintained by Facebook to test React apps.  </p>

            <h3>Install and Configure</h3>
            <code>$ yarn add —dev jest</code>

            <p>If you started your app with create-react-app boilerplate a lot of the configuration will already exist. To start testing all you need to do is run npm test.</p>
            <p>The file that you are testing should reside in a file that has the same name with .test.js ending.
            This file should reside in mirror directory structure vis a vi it's counterpart. </p>
            <p>Import the file at the top of the page. Typically you would create a wrapper ''describe'' function for the main piece of code being tested with nested ''describe'' statements for each smaller sub feature.
            Each feature is tested with a ''it'' function, the first parameter is a string describing this feature and giving it a title. The next parameter is a function holding the main test logic.
            Each assertion is tested with expect(some code here).toEqual(what it should equal)</p>
            <p>Here's an example.</p>
            <pre>
              <code>
                describe('Name of what's being tested, () => {

                      describe('name of function tested', () => {

                          it('description of path being tested', () => {

                              /* code logic here */

                              expect(
                                  /* some function input */
                              ).toEqual(
                                  /* expected function output */
                              )
                          });
                      });
                  });
              </code>
            </pre>

            <p>Learn more at the official Jest tutorial, link below.</p>

            <section class="blog_links">
              <h3>Links</h3>
              <div class="well well-lg">
              <p>
              <a href="https://facebook.github.io/jest/docs/en/tutorial-react.html">Official tutorial</a>
              </p>
              </div>
            </section>`,
    preview: 'Jest is a testing framework maintained by Facebook to test React...',
    created_on: new Date('2017-12-10T01:57:52Z'),
  },
  {
    title: 'Min and max heaps in Python3',
    content: `<div class="jumbotron_image__logo">
      <img class="img-responsive" src="../static/images/heaps.jpg" alt="heaps" />

    </div>


            <p>A min and max heap is a binary heap which is a binary tree that is ordered in a specific way. In the min heap each node is greater than or equal to the value of its parent, with the minimum value element at its root. For the max-heap the opposite is true. </p>

            <p>The heap data structure was invented by J. W. J. Williams in 1964, as a data structure for the heapsort sorting algorithm. He was a British born computer scientist that spent the latter part of his career in Ottawa, Canada. The heapsort algorithm divides it's input into sorted and unsorted regions and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region. </p>
            <img class="img-responsive center-image" src="../static/images/sorting_heapsort.gif" />
            <p class="caption-center">heapsort algorithm in action</p>

            <p>Heaps are usually implemented in an array. In a one based array, (array keeping a zero as the first element) each node has a left child at index * 2 and a right child at index * 2 + 1.  To get to the parent node, divide index by 2. To implement this data structure in python, we will create a class with the following functions.</p>
            <h3>Public functions</h3>

            <p><code>push(newItem)</code><br/>This adds a new item to the heap.</p>

            <p><code>pop()</code><br/>This removes the min or max item.</p>

            <p><code>peek()</code><br/>This returns the root item.</p>
            <h3>Private functions</h3>

            <p><code>__swap(item1, item2)</code><br/>Exchanges two items.</p>

            <p><code>__floatUp()</code><br/>Moves item up to its proper position in the heap.</p>

            <p><code>__bubbleDown()</code><br/>Moves item down to its proper position.</p>


            <p>With these functions our implementation of a max heap looks like this. To get a min heap, all you have to do is reverse some of the inequality signs</p>
            <pre>
              <code>
  class MaxHeap:
    def __init__(self, items=[]):
      super().__init__()
      self.heap = [0]
      for i in items:
        self.heap.append(i)
        self.__floatUp(len(self.heap) - 1)

    def push(self, data):
      self.heap.append(data)
      self.__floatUp(len(self.heap) - 1)

    def peek(self):
      if len(self.heap) > 1:
        return self.heap[1]
      else:
        return False

    def pop(self):
      if len(self.heap) > 2:
        self.__swap(1, len(self.heap) - 1)
        max = self.heap.pop()
        self.__bubbleDown(1)
      elif len(self.heap) == 2:
        max = self.heap.pop()
      else:
        max = False
      return max

    def __swap(self, i, j):
      self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def __floatUp(self, index):
      parent = index//2
      if index <= 1:
        return
      elif self.heap[index] > self.heap[parent]:
        self.__swap(index, parent)
        self.__floatUp(parent)

    def __bubbleDown(self, index):
      left = index * 2
      right = index * 2 + 1
      largest = index
      if len(self.heap) > left and self.heap[largest] < self.heap[left]:
        largest = left
      if len(self.heap) > right and self.heap[largest] < self.heap[right]:
        largest = right
      if largest != index:
        self.__swap(index, largest)
        self.__bubbleDown(largest)
              </code>
            </pre>

            <p>To practice this concept try solving a problem like the <a class="plain_link" href="http://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/">running mean</a> using heaps.</p>
            <section class="blog_links">
              <h3>Links</h3>
              <div class="well well-lg">
              <p>
              <a class="plain_link" href="https://www.geeksforgeeks.org/binary-heap/">Geeks for geeks</a>
              </p>
              <p>
              <a class="plain_link" href="https://en.wikipedia.org/wiki/Heap_(data_structure)">Wikipedia</a>
              </p><p>
              <a class="plain_link" href="https://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/heaps.html">More reading</a>
                </p>
              </div>
            </section>`,
    preview: 'A min and max heap is a binary heap which is a binary tree that is ordered',
    created_on: new Date('2017-12-17T01:59:48Z'),
  },
  {
    title: 'The Trie Data Structure in Python3',
    content: `<div class="jumbotron_image__logo">
      <img class="img-responsive" src="../static/images/trie2.png" alt="trie" />

    </div>
            <p>The trie is a data structure that is optimally efficient storage tree usually used for strings. It is an ordered tree data structure that is used to store a dynamic set or associative array where the keys are usually strings. The trie can insert and find strings in O(L) time where L is the length of the word. This can be more advantageous in certain situations over a hash table when you want to find words that have the same prefix in common and other similar cases. A trie can be met with in coding interviews but also can be useful in real world applications in software engineering. For example, auto complete text, orthographic corrector and other similar cases can be done very fast with a trie. </p>

            <p>Tries were first used by Rene de la Briandais in 1959. The term trie comes from the middle syllable of reTRIEval, first coined by Edward Fredkin. It is usually pronounced as 'try' to distinguish it verbally from 'tree.'</p>
            <img class="img-responsive center-image" src="../static/images/trie.png" />
            <p class="caption-center">A trie with the words "tree", "trie", "algo", "assoc", "all", and "also."</p>
            <p>This implementation of the trie in python will have these functions:</p>
            <ol>
                <li>insert. This will add a single string word to the trie. </li>
                <li>search. Returns true or false if the string is found.</li>
                <li>startsWith. Returns the number of words that have this prefix.</li>
            </ol>
            <pre>
              <code>
              class TrieNode:
                def __init__(self):
                  self.val = None
                  self.size = 0
                  self.pointers={}

              class Trie:
                def __init__(self):
                  self.root = TrieNode()

                def insert(self, word):
                  self.rec_insert(word, self.root)
                  return

                def rec_insert(self, word, node):
                  if word[:1] not in node.pointers:
                    newNode=TrieNode()
                    newNode.val=word[:1]
                    newNode.size = 0
                    node.pointers[word[:1]]=newNode
                    self.rec_insert(word, node)
                  else:
                    nextNode = node.pointers[word[:1]]
                    nextNode.size += 1
                    if len(word[1:])==0:
                      nextNode.pointers[' ']='__END__'
                      return
                    return self.rec_insert(word[1:], nextNode)

                def search(self, word):
                  if len(word)==0:
                    return False
                  return self.rec_search(word,self.root)

                def rec_search(self, word, node):
                  if word[:1] not in node.pointers:
                    return False
                  else:
                    nextNode = node.pointers[word[:1]]
                    if len(word[1:])==0:
                      if ' ' in nextNode.pointers:
                        return True
                      else:
                        return False
                    return self.rec_search(word[1:],nextNode)

                def startsWith(self, prefix):
                  if len(prefix)==0:
                    return 0
                  return self.rec_search_prefix(prefix, self.root)

                def rec_search_prefix(self, word, node):
                  if word[:1] not in node.pointers:
                    return 0
                  else:
                    if len(word[1:])==0:
                      nextNode = node.pointers[word[:1]]
                      return nextNode.size
                    nextNode = node.pointers[word[:1]]
                  return self.rec_search_prefix(word[1:],nextNode)
              </code>
            </pre>

            <p>To practice this concept try solving a problem like the
              <a target="_blank" class="plain_link" href="https://www.hackerrank.com/challenges/ctci-contacts/problem">contacts search application</a> using a trie.</p>
            <section class="blog_links">
              <h3>Links</h3>
              <div class="well well-lg">
              <p>
              <a target="_blank" class="plain_link" href="https://www.geeksforgeeks.org/trie-insert-and-search/">Geeks for geeks</a>
              </p>
              <p>
              <a target="_blank" class="plain_link" href="https://en.wikipedia.org/wiki/Trie">Wikipedia</a>
              </p><p>
              <a target="_blank" class="plain_link" href="https://www.topcoder.com/community/data-science/data-science-tutorials/using-tries/">Top Coder</a>
                </p>
              </div>
            </section>`,
    preview: 'The trie is a data structure that is optimally efficient storage tree ...',
    created_on: new Date('2017-12-23T02:09:48Z'),
  },
  {
    title: 'Bubble Sort and Quicksort Algorithms in Python3',
    content: `<p>Bubble sort is a not very efficient algorithm and generally not used in real world applications. It is the simplest sorting algorithm It works by iterating over the array of values and swapping them if they are in the wrong order. Hence they 'bubble up' to their proper positions.</p>

            <p>The simplest version will always run in O(n^2) time, even if the array is already sorted. An optimized version will stop once the inner loop didn't swap once.</p>
            <img class="img-responsive center-image" src="../static/images/blog/bubble_sort.gif" />
            <p class="caption-center">A bubble sort algorithm</p>
            <p>Time Complexity:</p>
            <ul>
                <li>Best Case: O(n)</li>
                <li>Worst Case: O(n^2)</li>
                <li>Average: O(n^2)</li>
            </ul>
            <pre>
              <code>
    n = 7
    a = [4,3,8,6,1,2,6]

    swaps = 0
    for x in range(n):
        currentSwaps = 0
        for z in range(0, n-1):
          if a[z] > a[z+1]:
              a[z], a[z + 1] = a[z + 1], a[z]
              swaps += 1
              currentSwaps += 1
        if currentSwaps = 0
        break
              </code>
            </pre>
          <div class="horizontal-space-md"></div>
            <h3>Quicksort</h3>
            <p>This is a very efficient sorting algorithm. It was developed by a British Computer Scientist Tony Hoare in 1959 and published in 1961. </p>
            <p>It is a "Divide and Congquer" algorithm like Merge Sort. It picks an element as a pivot and partitions the array around it. It puts on one side all elements lower and on the other side all those that are higher.</p>
            <p>There are different versions of the algorithm that pick the first pivot in different ways. Either as the first, last, random or median element in the array. </p>
            <p>Time Complexity:</p>
            <ul>
                <li>Best Case: O(n log n)</li>
                <li>Worst Case: O(n^2)</li>
                <li>Average: O(n log n)</li>
            </ul>
            <img class="img-responsive center-image" src="../static/images/blog/quicksort.gif" />
            <p class="caption-center">A quicksort algorithm</p>
            <pre>
                <code>
    def partition(arr,low,high):
        i = ( low-1 )         # index of smaller element
        pivot = arr[high]     # pivot

        for j in range(low , high):
            if   arr[j] <= pivot:
                i = i+1
                arr[i],arr[j] = arr[j],arr[i]
        arr[i+1],arr[high] = arr[high],arr[i+1]
        return ( i+1 )

    def quicksort(arr,low,high):
        if low < high:
            pi = partition(arr,low,high)
            quicksort(arr, low, pi-1)
            quicksort(arr, pi+1, high)
                </code>
            </pre>`,
    preview: 'Bubble sort is a not very efficient algorithm ...',
    created_on: new Date('2018-01-02T02:13:06Z'),
  },
  {
    title: 'The Longest Common Subsequence Problem',
    content: `
<p>This is a classic computer science problem. It is the basis of data comparison programs like the diff utility, and for version control systems like Git. The idea is to find the longest subsequence to all the sequences, most often involving only two. This is a problem that can be solved using dynamic programming. Dynamic programming is a method for solving complex problems by breaking the problem down into smaller sub problems. Each sub problem is solved just once, it's solution is stored so that the next time the same subproblem occurs, instead of recomputing it's solution, it is returned from memory. This technique of storing solutions to sub problems to be retrieved later when needed is called 'memoization.'</p>

            <p>The naive solution for this problem would be to generate all possible subsequences and find the longest matching subsequence. This solution is exponential in terms of time complexity. Because this problem has the following two properties it can be approached with a dynamic programming technique. This problem has an <u>optimal substructure</u>. This means that it can be broken down into smaller and simpler subproblems. This problem also has <u>overlapping subproblems</u> which means that the sub problems repeat themselves. These two properties make this problem solvable by a dynamic programming technique.</p>
            <p>The first property, the optimal substructure, is that it is composed of repeating sub problems. Suppose that two strings end with the same letter. Removing that letter and adding it to the resulting substring, you are left with two shorter strings. The solution can be found by repeating this process on the shorter strings until there are no letters left. If the last letters are not the same, the answer can be found by finding the max of either substring A with the last letter removed compared with substring B or substring A compared with substring B with the last letter removed.</p>
            <p>The second property, the overlapping subproblems, means that in the above described recursive method the same problem is repeatedly solved. This recomputation can be avoided by either using memoization or tabulation. In this solution we will use tabulation.</p>
            <p>The function LCS_calc() which creates the table of the length of the longest common subsequence (LCS). The function LCS_find() goes through that table, retrieves and prints the LCS. </p>
            <p>Time Complexity:</p>
            <ul>
                <li> O(mn)</li>
            </ul>
            <pre>
              <code>
  function LCS(x, y) {
    x = x.split('');
    y = y.split('');
    var lcs = [];
    return LCS_calc(lcs, x, y);
  }

  function LCS_calc(lcs, x, y) {
    var i, j, m = x.length, n = y.length;
    for(i = 0; i < m+1; i++) {
      for(j = 0; j < n+1; j++) {
        if (j===0) {
          lcs[i] = [];
        }
        if (i===0 || j===0) {
          lcs[i][j] = 0;
        } else if (x[i-1] === y[j-1]) {
          lcs[i][j] = lcs[i-1][j-1]+1;
        } else {
          lcs[i][j] = Math.max(lcs[i-1][j], lcs[i][j-1]);
        }
      }
    }
    return LCS_find(lcs, x, y, m, n);
  }

  function LCS_find(lcs, x, y, m, n) {
    var current = lcs[m][n],
        result = [];
    while (current > 0 && m > 0 && n > 0) {
      if (lcs[m][n-1] === lcs[m][n]-1 && lcs[m-1][n] === lcs[m][n]-1) {
        m--;
        n--;
        current--;
        result.unshift(x[m]);
      } else if (lcs[m][n-1] === lcs[m][n] && lcs[m-1][n] === lcs[m][n] && lcs[m-1][n-1] === lcs[m][n]) {
        m--;
        n--;
      } else if (lcs[m-1][n] === lcs[m][n]-1 && lcs[m][n-1] === lcs[m][n]) {
        n--;
      } else {
        m--;
      }
    }
    return result.join('');
  }

  LCS( "132535365" , "123456789" );// => returns "12356"
              </code>
            </pre>
          <div class="horizontal-space-md"></div>
`,
    preview: 'This is a classic computer science problem...',
    created_on: new Date('2018-01-14T02:13:48Z'),
  },
  {
    title: 'Merge Sort',
    content: `
<img class="img-responsive center-image" src="../static/images/blog/mergesort_gif.gif" />
            <p class="caption-center">A merge sort algorithm</p>

            <strong>HISTORY</strong>
            <p>The merge sort algorithm is an efficient divide and conquer sorting algorithm. It was invented by John von Neumann in 1945. John von Neumann (1903 - 1957) was a Hungarian-American mathematician, physicist and computer scientist. He is considered one of the greatest mathematicians of his time. </p>

            <img class="img-responsive center-image" src="../static/images/blog/neumann.gif" />
            <p class="caption-center">John von Neumann</p>
            <strong>HOW IT WORKS</strong>
            <p>This algorithm is a divid and conquer type. This means that problem is divided into smaller subproblems for which a solution is very simple. There are two parts, one the divide part and then the merge part. The input array is divided into half and recursively called on each half. The base case is the empty array. Once the sub part is only one item long, the merging starts. Two sub sections are merged with the lower item taking the position  before the higher item. All sub sections are merged until finally the last two halves are merged. </p>

            <strong>RUN TIME</strong>
            <p>What is the run time for this algorithm?
            The merge part of the algorithm takes O(n) time because the array needs to be traversed once, assigning the lower of the two items to the current array position. Now this merge step is done once for each of the divide steps. This means that the time complexity is O(n log n) because it takes log n for all the merge steps.</p>

            <strong>EXAMPLE DESCRIPTION</strong>
            <p>This is a python3 implementation of the merge sort algorithm. The divide step is done in the mergeSort function, while the merge step is done in the merge function. </p>

            <p>Time Complexity:</p>
            <ul>
                <li> O(n log n)</li>
            </ul>
            <pre>
              <code>
  def mergeSort(arr, start, end):
    if (start < end):
      middle = start+((end-start)//2)
      mergeSort(arr, start, middle)
      mergeSort(arr, middle+1, end)
      merge(arr, start, middle, end)

  def merge(arr, start, middle, end):
    leftHalf = arr[start:middle+1]
    rightHalf = arr[middle+1:end+1]
    i=0
    j=0
    k=start
    while (i < len(leftHalf) and j < len(rightHalf)):
      if (leftHalf[i] <= rightHalf[j]):
        arr[k] = leftHalf[i]
        i += 1
      else:
        arr[k] = rightHalf[j]
        j += 1
      k += 1
    while (i < len(leftHalf)):
      arr[k] = leftHalf[i]
      i += 1
      k += 1
    while (j < len(rightHalf)):
      arr[k] = rightHalf[j]
      j += 1
      k += 1

  arr = [14, 7, 3, 12, 9, 11, 6, 2]
  n = len(arr)
  mergeSort(arr,0,n-1)
  print(arr) # result equals [2, 3, 6, 7, 9, 11, 12, 14]

              </code>
            </pre>
          <div class="horizontal-space-md"></div>`,
    preview: 'The merge sort algorithm is an efficient divide and conquer sorting algorithm...',
    created_on: new Date('2018-01-28T02:14:49Z'),
  },
  {
    title: "Heap's Algorithm",
    content: `<p>Heaps algorithm is a simple and elegant solution to finding permutations. Finding permutations is one of the fundamental problems of computing and provides the basis for backtracking problems. However permutation problems are encountered less frequently in real world applications.</p>
            <strong>HISTORY</strong>

            <p>This algorithm was first proposed by B. R. Heap in a paper in
                The Computer Journal in 1963. You can read the paper
<a href="https://academic.oup.com/comjnl/article/6/3/293/360213" target="_blank">here.</a>
</p>
            <p>Heaps algorithm finds all permutations of an array. It first iterates through the array and for each item finds the all possible permutations of length - 1 of the array. The recursive function works like so. It accepts the array and the size of it. It calls itself recursively, with the size of it getting shorter by one each time. When the size equals 1 it prints out the array and returns. Inside the for loop, if the size of the array is odd, a swap between the first and the last or size-1 positions occurs.</p>
            <p> The loop continues and another recursive call is made on the new altered array. Again if the size variable is equal to one, the array is printed and the function returns. The loop continues and again, since the size is the same in this loop, in our case it is even, another swap is made.</p>
            <p> The reason why this works is intuitively difficult to get. The wikipedia article even had an incorrect version on its page for a long time because it is often memorized and therefore it is easy to make a mistake.</p>
            <p> <a target="_blank" class="plain_link" href="http://ruslanledesma.com/2016/06/17/why-does-heap-work.html">This article</a> provides a good explanation of why this works. Another excellent article generating permutations is <a target="_blank" class="plain_link" href="https://www.topcoder.com/blog/generating-permutations/">here</a>.</p>

            <p>Time Complexity:</p>
            <ul>
                <li> O(n!)</li>
            </ul>
            <p>Space Complexity:</p>
            <ul>
                <li> O(n)</li>
            </ul>
            <pre>
              <code>
class Solution:
  def permute(self, nums):
      """
      :type nums: List[int]
      :rtype: List[List[int]]
      """
      result = []
      size = len(nums)
      return self.permuteRec(nums, size, result)

  def permuteRec(self, nums, n, result):
      if n == 1:
        copy = nums[:]
        result.append(copy)
        return result
      for i in range(n):
        result = self.permuteRec(nums, n-1, n, result)
        if (n % 2 == 1):
          nums[0], nums[n-1] = nums[n-1], nums[0]
        else:
          nums[i], nums[n-1] = nums[n-1], nums[i]
      return result
              </code>
            </pre>
          <div class="horizontal-space-md"></div>`,
    preview: 'Heaps algorithm is a simple and elegant solution to finding permutations.',
    created_on: new Date('2018-02-15T02:16:03Z'),
  },
  {
    title: 'What is Functional Programming?',
    content: `<p>March 30th, 2019</p>
                                <br />
                                <p>
                                    Functional programming is a style of writing
                                    software that stresses using pure functions,
                                    avoiding modifying global state and employs
                                    declarative statements. Declarative
                                    programming style instructs what needs to
                                    get done, instead of how. Functional
                                    programming treats computation as the
                                    evaluation of mathematical functions. This
                                    is opposed to object oriented programming,
                                    which is based on modifying global state.
                                </p>
                                <p>
                                    Pure functions are functions that have the
                                    same output for the same input. They do not
                                    depend on and do not modify any global
                                    state. For example: calling a function with
                                    the same input twice will give the same
                                    output. Pure functions can be easily
                                    isolated, and reused. This makes testing and
                                    thinking about the code very easy, as you do
                                    not require to set up any environment and
                                    not worry about hidden edge cases. To test,
                                    you only need to pass in a value and expect
                                    to get a value returned.
                                </p>
                                <p>
                                    When using pure functions, memoization is very easy,
                                    you only need to calculate the output for an
                                    input once and cache the result. This is
                                    easy as no global state is modified and
                                    there are no side effects of the function.
                                </p>
                                <p>
                                    Functional programming avoids changing
                                    global state, stresses immutability and uses
                                    declarative statements.
                                </p>`,
    preview: 'Functional programming is a style of writing software that stresses using pure functions, avoiding modifying global state and employs declarative statements...',
    created_on: new Date('2019-03-30T02:19:30Z'),
  },
  {
    title: 'Helpful git Commands',
    content: `<br />
                <p>
                  How to set github user email in git terminal specific to a
                  project?
                </p>
                <code>
                  git config user.email "your@email.com"
                </code>
                <br />
                <br />
                <p>
                  How to undo the last git commit and revert the changes?
                </p>
                <code>
                  git reset --hard HEAD~1
                </code>
                <br />
                <br />
                <p>
                  How to undo the last git commit and keep the changes?
                </p>
                <code>
                  git reset --soft HEAD~1
                </code>
                <br />
                <br />
                <p>
                  How to revert multiple commits, inclusively?
                </p>
                <code>
                  git revert --no-commit < hash of last commit to revert >..HEAD
                </code>
                <br />
                <br />
                <p>
                  How to remove remote directory after adding to .gitignore?
                </p>
                <code>
                  git rm -r --cached <directory or file>
                </code>`,
    preview: 'How to set github user email in git terminal specific to a project? ...',
    created_on: new Date('2019-09-30T02:21:05Z'),
  },
  {
    title: '2020 in Books',
    content: `<h3>Top 3 Favorites:</h3>
<strong>1. Operating Manual for Spaceship Earth</strong>
<p>Buckminster Fuller</p>
<img class="img-responsive center-image" src="../static/images/blog/operating_manual.jpeg" />


<strong>2. Benjamin Franklin</strong>
<p>Walter Isaacson</p>
<img class="img-responsive center-image" src="../static/images/blog/ben_franklin.jpeg" />

<strong>3. Zen Mind, Beginners Mind</strong>
<p>Shunryu Suzuki</p>
<img class="img-responsive center-image" src="../static/images/blog/zen_mind.jpeg" />
<br />

<p>The others, all of which are awesome:</p>
<br />
<br />
<p>
  Discover Your Dragon
</p>
<img class="img-responsive center-image img-w-med" src="../static/images/blog/discover_your_dragon.jpg" />
<p>
  Do Androids Dream of Electric Sheep? - Philip K Dick
</p>
<img class="img-responsive center-image" src="../static/images/blog/do_androids_dream.jpeg" />

<p>
  The Three Body Problem
</p>
<img class="img-responsive center-image" src="../static/images/blog/three_body.jpeg" />
<p>
  The Secrets of a JavaScript Ninja
</p>
<img class="img-responsive center-image" src="../static/images/blog/secrets_of_js.jpeg" />
<p>
  The Four Agreements
</p>
<img class="img-responsive center-image" src="../static/images/blog/the_four_agreements.jpeg" />
<p>
  The Volunteer: One Man, an Underground Army, and the Secret Mission to Destroy Auschwitz
</p>
<img class="img-responsive center-image" src="../static/images/blog/the_volunteer.jpeg" />
<p>The Future of Business: An Introduction to Artificial Intelligence</p>
<p>By David Vandergrift</p>
<img class="img-responsive center-image" src="../static/images/blog/the_future_of_business.jpeg" />
<br />
<br />
<p>
  Lifehacked: How One Family from the Slums Made Millions Selling Apps
</p>
<p>
  Learn React Hooks
</p>
<p>
  The Little Prince
</p>
<p>
  The Pearl - John Steinbeck
</p>
<p>
  A New Earth - Eckhart Tolle
</p>`,
    preview: '3 Favorites plus all of the other awesome books I read this year',
    created_on: new Date('2021-01-05T04:39:17Z'),
  },
  {
    title: 'Why create a VR Meditation Room?',
    content: `<strong>
  Why create a VR Meditation Room?
</strong>
<br />
<br />
<p>
  I am creating a meditation room in VR because every person that is interested in
  meditation can benefit from having access to their own dedicated space for this practice.
  VR allows one to enter a setting that is conducive to feelings of sacredness, tranquility
  and deep concentration,
  no matter where you are in the physical world. Here one may find refuge from
  surroundings that contain distractions and messiness. This application
  will allow anyone to enter into a sanctuary with ease. It will also provide a
  timer with a gong for support of a regular practice.
</p>
<br />
<strong>
  What features will the VR Meditation Room have when it is done?
</strong>
<br />
<br />
<p>The first iteration will include:</p>
<ol>
  <li>An indoor space that is inside a dome structure (Buckminster Fuller inspired)</li>
  <li>A sculpture of a Buddha in meditation pose</li>
  <li>A meditation timer with gong sound for start and end</li>
  <li>Minimalist design of the indoor space that is conducive to concentration and contemplation</li>
  <li>Available to play on Oculus Quest 1 and 2, from SideQuest.com</li>
</ol>
<br />
<br />
<strong>
  How did you get the idea to make a meditation room in VR?
</strong>
<br />
<br />
<p>
  The idea came from my own personal need for a meditation timer. I use a very simple
  one I downloaded from the Apple App Store on my iPhone. Every morning
  I meditate for ten minutes, and the gong sound marks
  the end. At one point I realized that it would be really nice to have a whole meditation room
  in VR that would include a timer, and contain things like an ancient buddhist sculpture, and other
  buddhist art.
</p>`,
    preview: 'Summary of the intentions for this app, features list and road map',
    created_on: new Date('2021-01-06T20:17:51Z'),
  },
  {
    title: 'Nand2Tetris Part II Chapter 8',
    content: `<h3>
  Notes on Chapter 8 - Week 2 of Nand2Tetris Part 2
</h3>
<br />
<br />
<h3>Unit 2.4: Function Call and Return: Implementation Preview</h3>
<ul>
  <li>We create state when we run a function</li>
  <li>We have to save the state and return to it when calling a new function</li>
  <li>When the function returns, we recycle the state</li>
  <li>The Calling pattern is LIFO, Last In First Out</li>
</ul>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_1.png" alt="">
</div>
<ul>
  <li>The frame is the return address and the memory segments of the caller (LCL, ARG, THIS, THAT)</li>
  <li>1. Copy the return value onto argument 0</li>
  <li>2. Restores the segment pointers of the caller</li>
  <li>3. Clears the stack</li>
  <li>4. Sets SP for the caller</li>
  <li>5 Jumps to the return address within the caller's code</li>
  <li>This is complicated, but this is not a surprise, because we are creating a little brain. It has the capacity to do one function, put it on hold, and then return to it when it's done. This is sophisticated, no wonder the implementation is non trivial.</li>
  <li>Very simple from the abstract view: call function, and get the result, but very complicated behind the scenes</li>
</ul>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_2.png" alt="">
</div>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_3.png" alt="">
</div>
<h3>Unit 2.5: Function Call and Return: Run-time Simulation</h3>
<ul>
<li>example of calling factorial of 3, run time simulation</li>
</ul>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_4.png" alt="">
</div>
<h3>
  Unit 2.6: Function Call and Return Implementation
</h3>
<ul>
  <li>Handling call:</li>
  <ul>
    <li> push returnAddress (using a label)</li>
    <li>push LCL, ARG, THIS, THAT // save of the caller</li>
    <li>ARG = SP - 5 - nArgs // Reposition ARG</li>
    <li>LCL = SP // Reposition LCL</li>
    <li>goto functionName // Transfers control to the called function</li>
    <li>(returnAddress) // Declare a label for the return-address</li>
  </ul>
</ul>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_5.png" alt="">
</div>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_6.png" alt="">
</div>
<br />
<h3>
  Unit 2.7: VM Implementation on the Hack Platform
</h3>
<ul>
  <li>VM programming convention: One file must be named Main.vm, with one function named main</li>
  <li>Bootstrap code: SP=256, Call Sys.init</li>
  <li>Special symbols</li>
</ul>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_7.png" alt="">
</div>
<h3>
  Unit 2.8: VM Translator: Proposed Implementation
</h3>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_8.png" alt="">
</div>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_9.png" alt="">
</div>
<div class="blog__image">
  <img src="../static/images/blog/notes/week_8_10.png" alt="">
</div>
<br />
<h3>Lecture Slides</h3>
<br />
<embed
    src="https://konradgnat.com/static/pdf/nand2Tetris_chapter_8_slides.pdf"
    type="application/pdf"
    frameBorder="0"
    scrolling="auto"
    height="900px"
    width="100%"
></embed>
<br />
<h3>Chapter 8 from the course book</h3>
<br />
<embed
    src="https://konradgnat.com/static/pdf/nand2Tetris_chapter_8.pdf"
    type="application/pdf"
    frameBorder="0"
    scrolling="auto"
    height="900px"
    width="100%"
></embed>`,
    preview: 'Notes on Chapter 8',
    created_on: new Date('2021-09-10T12:56:58Z'),
  },
];

async function main() {
  console.log('Starting blog post migration...');

  for (const post of blogPosts) {
    try {
      const createdPost = await prisma.blogPost.create({
        data: post,
      });
      console.log(`✓ Migrated: "${createdPost.title}"`);
    } catch (error) {
      console.error(`✗ Failed to migrate: "${post.title}"`, error);
    }
  }

  console.log('Migration completed!');
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
