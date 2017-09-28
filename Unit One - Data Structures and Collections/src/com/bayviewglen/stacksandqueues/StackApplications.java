package com.bayviewglen.stacksandqueues;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.Scanner;
import java.util.Stack;

public class StackApplications {

	public static void main(String[] args) throws FileNotFoundException {
		System.out.println("-------Infix-------");
		testInfix("data/infix.dat");
		System.out.println("------PostFix------");
		testPostfix("data/postfix.dat");
	}

	private static void testPostfix(String fileName) throws FileNotFoundException {
		File f = new File(fileName);
		Scanner in = new Scanner(f);
		int count = 0;
		while (in.hasNext()) {
			System.out.print(++count + ") ");
			String expression = in.nextLine();
			evaluatePostfix(expression.split(" "));
		}
	}

	private static void evaluatePostfix(String[] expression) {
		Stack<Double> operands = new Stack<Double>();
		for (String x : expression) {
			try {
				double temp = Double.parseDouble(x);
				operands.push(temp);
			} catch (Exception e) {
				double b = operands.pop();
				double a = operands.pop();
				operands.push(calculate(a, b, x));
			}
		}
		System.out.println(operands.peek());

	}

	private static void testInfix(String fileName) throws FileNotFoundException {
		File f = new File(fileName);
		Scanner in = new Scanner(f);
		int count = 0;
		while (in.hasNext()) {
			System.out.print(++count + ") ");
			String expression = in.nextLine();
			evaluateInfix(expression.split(" "));
		}

	}

	private static void evaluateInfix(String[] expression) {
		Stack<String> operators = new Stack<String>();
		Stack<Double> operands = new Stack<Double>();
		String arithmetics = "+*/-^";
		for (String x : expression) {
			try {
				double temp = Double.parseDouble(x);
				if (arithmetics.indexOf(operators.peek()) != -1) {
					double temp1 = operands.pop();
					operands.push(calculate(temp1, temp, operators.pop()));
				} else {
					operands.push(temp);
				}
			} catch (Exception e) {
				if (x.equals("(")) {
					operators.push(x);
				} else if (x.equals(")")) {
					operators.pop();
					if (!operators.empty() && arithmetics.indexOf(operators.peek()) != -1) {
						double b = operands.pop();
						double a = operands.pop();
						operands.push(calculate(a, b, operators.pop()));
					}
				} else {
					operators.push(x);
				}
			}
		}
		System.out.println(operands.peek());
	}

	public static double calculate(double a, double b, String op) {
		if (op.equals("*")) {
			return a * b;
		} else if (op.equals("/")) {
			return a / b;
		} else if (op.equals("+")) {
			return a + b;
		} else if (op.equals("-")) {
			return a - b;
		} else if (op.equals("^") || op.equals("**")) {
			return Math.pow(a, b);
		}
		return 0;

	}

}