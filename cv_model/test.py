# import system library
import sys

# take passed variable values 
first_num = int(sys.argv[1])
second_num = int(sys.argv[2])

# calcluate the total using variable values and print the output
def calculate_total(first_num , second_num ):
    print(first_num + second_num )

# call the function and pass variables to it
calculate_total(first_num , second_num)