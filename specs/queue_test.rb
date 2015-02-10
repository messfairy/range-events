require '../src/priority_queue'
class QueueTest
  # total = [123, 2, 5].reduce 6, :+
  queue = PriorityQueue.new
  queue.enq 'jano'
  queue.enq 'valentina'
  queue.enq 'zombie'
  queue.enq 'fran'
  queue.enq 'bob'
  queue.enq 'albert'
  queue.enq 'bob'
  queue.enq 'albert'
  queue.enq 'frank'
  size = queue.size
  array = []
  peek = queue.peek
  while size > 0
    array.push queue.deq
    size -= 1
  end
  puts "peek: #{peek}"
  puts array
end