class EmptyError < RuntimeError
end
class PriorityQueue
  def DEFAULT_COMPARATOR
    Proc.new do |a, b|
      if a.is_a? Numeric
        a - b
      else
        a = a.to_s
        b = b.to_s
        if a == b
          0
        else
          a > b ? 1 : -1
        end
      end
    end
  end

  attr :elements

  def initialize(&comparator)
    @comparator = comparator || self.DEFAULT_COMPARATOR
    @elements = []
  end

  def peek
    (raise EmptyError.new, 'PriorityQueue is empty') if self.isEmpty
    return @elements[0]
  end

  def deq
    first = self.peek
    last = @elements.pop
    size = self.size
    return first if size == 0
    @elements[0] = last
    current = 0
    while current < size do
      largest = current
      left = 2 * current + 1
      right = 2 * current + 2
      largest = left if (left < size && self._compare(left, largest) > 0)
      largest = right if (right < size && self._compare(right, largest) > 0)
      break if largest == current
      self._swap(largest, current)
      current = largest
    end
    first
  end

  def enq(element)
    size = @elements.push(element).size
    current = size - 1
    while current > 0 do
      parent = ((current - 1) / 2).to_i
      break if self._compare(current, parent) < 0
      self._swap parent, current
      current = parent
    end
    size
  end

  def size
    @elements.size
  end

  def isEmpty
    self.size == 0
  end

  def each(&proc)
    @elements.each proc
  end

  def _compare(a, b)
    @comparator.call(@elements[a], @elements[b])
  end

  def _swap(a, b)
    aux = @elements[a]
    @elements[a] = @elements[b]
    @elements[b] = aux
  end
end