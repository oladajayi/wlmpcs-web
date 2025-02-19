
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
        const members = JSON.parse(localStorage.getItem('members')) || [];
    
        const formatToNaira = (value) => {
            const formatter = new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
            });
        
            return formatter.format(value);
        };

        let memberRecord = members.find((member) => member.lpNumber === currentUser.lpNumber)

    // update members page record
        document.getElementById("members-name").textContent = currentUser.name;
        document.getElementById("total-savings-amount").textContent = formatToNaira(memberRecord.totalSavings) ;
        document.getElementById("normal-loan-amount").textContent = formatToNaira(memberRecord.normalLoan);
        document.getElementById("special-loan-amount").textContent = formatToNaira(memberRecord.specialLoan);

        