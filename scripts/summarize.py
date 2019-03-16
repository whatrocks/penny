import csv

with open('traffic.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=",")
    
    # skip header
    next(csv_reader)

    # NOTE: This was for inspecting the data!
    service_names = set()
    consumers = set()
    status_codes = set()
    methods = set()

    for row in csv_reader:
        service_names.add(row[1])
        methods.add(row[2])
        consumers.add(row[3])
        status_codes.add(row[5])
    print(status_codes)


    
